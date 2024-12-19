"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { items } from "../items";
import price from "/public/icons/price.svg";
import car from "/public/icons/car.svg";
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
  variants: Variant[];
};

const ItemDetail: React.FC = () => {
  const { id: queryId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState<boolean>(false);

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
    localStorage.setItem("cant", cant.toString());
  };

  const handleBuy = () => {
    console.log("compraste " + cant + " " + item.name);
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
          variants: product.variants,
          price: product.variants.reduce(
            (acc: number, curr: Variant) =>
              curr.price > acc ? curr.price : acc,
            0
          ),
        };

        return setProduct(formatedProduct);
      })
      .catch(() => setError(true));
  }, [queryId]);

  return (
    <div className="flex flex-col h-screen w-screen text-white items-center justify-center ">
      {error && <span>Error</span>}
      {!product && !error && <LoadingAnimation />}
      {product && (
        <div className="flex flex-col h-screen w-screen text-white items-center justify-center">
          {/* Imagen */}
          <div className="absolute">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              width={338}
              height={487}
            />
          </div>
          <div className="flex ml-[40vw] mt-[45vh] relative">
            <div>
              {/* Nombre del producto */}
              <h1 className="text-3xl font-bold">
                {product.title.toUpperCase()}
              </h1>
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
              {/* Stock si quedan menos de 5 */}
              {/* <p className="text-base font-bold my-1">
                    {item.stock < 6 && `Ultimas: ${item.stock}`}
                  </p> */}
              <div className="flex space-x-2">
                {/* Botones compra */}
                <button
                  className="flex justify-between p-4 items-center font-bold text-base text-white w-[11rem] h-11 border-[1px] border-white rounded bg-black"
                  onClick={handleAdd}
                >
                  <p>agregar</p>
                  <Image src={car} alt="carrito" width={18} height={18} />
                </button>
                <button
                  className="flex justify-between p-4 items-center font-bold text-base text-white w-[11rem] h-11 border-[1px] border-white rounded bg-black"
                  onClick={handleBuy}
                >
                  <p>comprar</p>
                  <Image src={price} alt="precio" width={10} height={10} />
                </button>
              </div>
            </div>
            {/* Stock si quedan menos de 5 */}
            <p className="text-base font-bold my-1">
              {item.stock < 6 && `Ultimas: ${item.stock}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
