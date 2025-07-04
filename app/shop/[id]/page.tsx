"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import car from "/public/icons/car.svg";
import { PricePill } from "@/components/ui/PricePill";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

type Img = {
  src: string;
  height: number;
  width: number;
  alt: string;
};

type Product = {
  id: number;
  title: string;
  images: Img[];
  price: number;
  stock: number;
  quantity: number;
};

const ItemDetail: React.FC = () => {
  const { addToCart } = useCart();
  const { id: queryId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState<boolean>(false);
  const [cant, setCant] = useState<number>(1);
  const [indexImage, setIndexImage] = useState<number>(0);
  // const [loadedImage, setLoadedImage] = useState("");

  const handlePlus = () => {
    if (!product) return;

    if (cant < product.stock) {
      setCant(cant + 1);
    }
  };

  const handleMinus = () => {
    if (cant > 1) setCant(cant - 1);
  };

  const handleAdd = (product: Product) => {
    addToCart({ ...product, quantity: cant });
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
      body: JSON.stringify({ gid: queryId }),
    })
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);

        if (product.stock === 0) {
          setCant(0);
        }
      })
      .catch(() => setError(true));
  }, [queryId]);

  useEffect(() => {
    if (!product || !product.images || product.images.length === 0) return;
    // setLoadedImage(product.images[0].src);

    const interval = setInterval(() => {
      const nextIndex = (indexImage + 1) % product.images!.length;
      const nextImage = product.images[nextIndex].src;

      // Pre-cargar la imagen manualmente
      fetch(nextImage)
        .then((res) => res.blob()) // Convierte la imagen en blob
        .then(() => {
          // setLoadedImage(nextImage);
          setIndexImage(nextIndex);
        })
        .catch((err) => console.error("Error precargando imagen:", err));
    }, 600);

    return () => clearInterval(interval);
  }, [ product, indexImage ]);

  return (
    <div>
      {error && <span>Error</span>}
      {!product && !error && <LoadingAnimation />}
      {product && (
        <div className="flex flex-col h-screen-dvh w-screen text-white items-center justify-center">
          {/* Imagen */}
          <div className="md:absolute">
            <div className="relative w-[25rem] h-[25rem] md:w-[40rem] md:h-[40rem] z-10 md:z-0">
              <Image
                src={product.images[indexImage].src}
                alt={product.title}
                sizes="(max-width: 768px) 100vw, 768px"
                fill
                priority
              />
            </div>
          </div>
          <div className="flex md:relative w-[100vw] justify-center md:justify-start">
            {/* Nombre del producto */}
            <div className="md:ml-[52%] md:mt-[37vh] mt-5 flex flex-col">
              <h1 className="text-base lg:text-3xl font-bold text-center md:text-left mix-blend-difference">
                {product.title.toUpperCase()}
              </h1>
              <div className="w-[15rem]">
                <div className="flex justify-between my-4 items-center">
                  {/* Precio */}
                  <PricePill price={product.price} paddingClass="px-4 py-1" />
                  {/* Botones cantidad */}
                  <div className="flex justify-around items-center font-bold text-base text-white rounded-full w-28 h-8 border-[1px] border-white ">
                    <button onClick={handleMinus}>-</button>
                    <p>{cant}</p>
                    <button onClick={handlePlus}>+</button>
                  </div>
                </div>
                <div
                  className="flex justify-between my-4 items-center "
                  onClick={() => {
                    if (product.stock > 0) handleAdd(product);
                  }}
                >
                  {/* Botón agregar */}
                  {product.stock > 0 ? (
                    <button className="flex justify-between p-4 items-center font-bold text-base text-white w-full h-11 border-[1px] border-white rounded bg-black z-10">
                      <p>agregar</p>
                      <Image src={car} alt="carrito" width={18} height={18} />
                    </button>
                  ) : (
                    <button className="flex justify-center p-4 items-center font-bold text-base text-white w-full h-11 border-[1px] border-white rounded bg-black">
                      <p>sold out :)</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
