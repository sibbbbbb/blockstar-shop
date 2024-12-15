"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { items } from "../items";
import remera from "/public/products/remera.png";
import price from "/public/icons/price.svg";
import car from "/public/icons/car.svg";
import { useState, useEffect } from "react";
import { type } from "os";

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
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<boolean>(false);

  const item = items[0];

  const value = Number(localStorage.getItem("cant"));
  const [cant, setCant] = useState(value ?? 1);

  if (!item) {
    return <p>Prenda no encontrada.</p>;
  }

  const handlePlus = () => {
    if (cant < item.stock) {
      setCant(cant + 1);
    }
  };

  const handleMinus = () => {
    setCant(cant - 1);
  };

  const handleAdd = () => {
    localStorage.setItem("cant", cant.toString());
  };

  const handleBuy = () => {
    console.log("compraste " + cant + " " + item.name);
  };

  useEffect(() => {
    try {
      fetch("/api/products/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      })
        .then((res) => res.json())
        .then(({ product }) => {
          setProduct(product);
        });
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen text-white items-center justify-center ">
      {/* Imagen */}
      <div className="absolute">
        <Image src={remera} alt="remera" width={338} height={487} />
      </div>
      <div className="flex ml-[30vw] mt-[30vh] relative">
        <div>
          {/* Nombre del producto */}
          <h1 className="mt-2 text-3xl font-bold ">
            {item.name.toUpperCase()}
          </h1>
          <div className="flex justify-between my-2 items-center ">
            {/* Precio */}
            <div className="flex justify-center  items-center text-base font-bold bg-gray-200 text-black rounded-full w-[7rem] h-9">
              <p>${15000}</p>
            </div>
            {/* Botones cantidad */}
            <div className="flex justify-between items-center font-bold text-base text-white rounded-full w-[9rem] h-10 border-2 border-white ">
              <button onClick={handleMinus} className="p-5">
                -
              </button>
              <p>{cant}</p>
              <button onClick={handlePlus} className="p-5">
                +
              </button>
            </div>
          </div>
          {/* Stock si quedan menos de 5 */}
          <p className="text-base font-bold my-1">
            {item.stock < 6 && `Ultimas: ${item.stock}`}
          </p>
          <div className="flex space-x-2">
            {/* Botones compra */}
            <button
              className="flex justify-between p-4 items-center font-bold text-base text-white w-[12rem] h-11 border-2 border-white rounded bg-black"
              onClick={handleAdd}
            >
              <p>agregar</p>
              <Image src={car} alt="carrito" width={18} height={18} />
            </button>
            <button
              className="flex justify-between p-4 items-center font-bold text-base text-white w-[12rem] h-11 border-2 border-white rounded bg-black"
              onClick={handleBuy}
            >
              <p>comprar</p>
              <Image src={price} alt="precio" width={10} height={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
