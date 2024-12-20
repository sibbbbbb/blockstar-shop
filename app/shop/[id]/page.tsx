"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { items } from "../items";
import car from "/public/icons/car.svg";
import trash from "/public/icons/trash.svg";
import bigcar from "/public/icons/bigcar.svg";
import close from "/public/icons/close-x.svg";
import { PricePill } from "@/components/ui/PricePill";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import { useState, useEffect } from "react";

type Variant = {
  inventory_quantity: number;
  price: number;
};

type Img = {
  src: string;
  height: number;
  width: number;
  alt: string;
};

type Product = {
  id: number;
  title: string;
  image: Img;
  price: number;
  quantity: number; // Nueva propiedad para manejar cantidades
};

const ItemDetail: React.FC = () => {
  const { id: queryId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState<boolean>(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const item = items[0];
  const value = Number(localStorage.getItem("cant"));
  const [cant, setCant] = useState(value ?? 1);

  const handlePlus = () => {
    if (cant < item.stock) {
      setCant(cant + 1);
    }
  };

  const handleMinus = () => {
    if (cant > 1) setCant(cant - 1);
  };

  const handleAdd = () => {
    if (!product) return;

    // Obtener cantidad almacenada en localStorage (por defecto 0 si no existe)
    const storedQuantity = Number(localStorage.getItem("cant")) || 0;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Si el producto ya está en el carrito, actualizamos la cantidad
        const updatedCart = prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + cant }
            : item
        );

        // Actualizamos localStorage con la nueva cantidad
        localStorage.setItem("cant", (storedQuantity + cant).toString());

        return updatedCart;
      }

      // Si no está, lo agregamos al carrito con la cantidad seleccionada
      const newItem = { ...product, quantity: cant };

      // Guardamos la nueva cantidad en localStorage
      localStorage.setItem("cant", (storedQuantity + cant).toString());

      return [...prevCart, newItem];
    });

    setSidebarOpen(true); // Abrimos el sidebar
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleRemove = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleBuy = () => {
    console.log("Comprado");
  };

  useEffect(() => {
    if (!queryId) {
      setError(true);
      return;
    }

    fetch("/api/products/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: queryId }),
    })
      .then((res) => res.json())
      .then(({ product, error = false }) => {
        if (error) return setError(true);
        const formatedProduct: Product = {
          id: product.id,
          title: product.title,
          image: {
            src: product.image.src,
            height: product.image.height,
            width: product.image.width,
            alt: product.image.alt,
          },
          price: product.variants.reduce(
            (acc: number, curr: Variant) =>
              curr.price > acc ? curr.price : acc,
            0
          ),
          quantity: 1, // Por defecto, cantidad inicial 1
        };

        return setProduct(formatedProduct);
      })
      .catch(() => setError(true));
  }, [queryId]);

  return (
    <div>
      {error && <span>Error</span>}
      {!product && !error && <LoadingAnimation />}
      {product && (
        <div className="flex flex-col h-screen w-screen text-white items-center justify-center">
          {/* Imagen */}
          <div className="md:absolute">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              width={338}
              height={487}
            />
          </div>
          <div className="flex md:relative w-[100vw] justify-center md:justify-start">
            {/* Nombre del producto */}
            <div className="md:ml-[52%] md:mt-[37vh] mt-5 flex flex-col">
              <h1 className="text-base lg:text-3xl font-bold text-center md:text-left">
                {product.title.toUpperCase()}
              </h1>
              <div className="w-[15rem] ">
                <div className="flex justify-between my-4 items-center ">
                  {/* Precio */}
                  <PricePill price={product.price} paddingClass="px-4 py-1" />
                  {/* Botones cantidad */}
                  <div className="flex justify-around items-center font-bold text-base text-white rounded-full w-28 h-8 border-[1px] border-white ">
                    <button onClick={handleMinus}>-</button>
                    <p>{cant}</p>
                    <button onClick={handlePlus}>+</button>
                  </div>
                </div>
                <div className="flex justify-between my-4 items-center">
                  {/* Botón agregar */}
                  <button
                    className="flex justify-between p-4 items-center font-bold text-base text-white w-full h-11 border-[1px] border-white rounded bg-black"
                    onClick={handleAdd}
                  >
                    <p>agregar</p>
                    <Image src={car} alt="carrito" width={18} height={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#111111] shadow-lg transition-transform transform text-sm md:text-base ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } w-full md:w-[400px] z-50`}
      >
        <div className="p-4 flex justify-between items-center border-b-2 border-[#333333]">
          <Image
            src={bigcar}
            alt="carrito"
            width={30}
            height={30}
            className="opacity-35"
          />
          <button
            className="text-white font-bold"
            onClick={() => setSidebarOpen(false)}
          >
            <Image src={close} alt="Cerrar" width={20} height={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-white">Tu carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4 border-b border-[#333333] pb-2"
              >
                <div>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={150}
                    height={150}
                    className="rounded"
                  />
                </div>
                <div>
                  <p className="text-white font-bold mb-2">{item.title}</p>
                  <div className="flex justify-between items-center ">
                    <div>
                      <p>Cantidad: {item.quantity}</p>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button onClick={() => handleRemove(item.id)}>
                      <Image
                        src={trash}
                        alt="Eliminar"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="fixed bottom-0 left-0 w-full p-4 border-t">
            <div className="flex justify-between items-center mb-5">
              <span className="text-lg font-semibold">Total estimado:</span>
              <span className="text-lg font-bold">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <button
              className="flex justify-between w-full bg-[#D9D9D9] text-black p-4 rounded-md font-bold hover:bg-white"
              onClick={handleBuy}
            >
              comprar
            </button>
            <p className=" text-sm  mt-5">
              (envio, impuestos y descuentos se calculan en el check out)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
