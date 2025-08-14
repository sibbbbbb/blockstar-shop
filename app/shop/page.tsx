"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { PricePill } from "@/components/ui/PricePill";
import LoadingAnimation from "@/components/ui/LoadingAnimation";

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
  stock: number;
  variants: Variant[];
};

const ShopIndex: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products/list")
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  return (
    <div className="flex flex-col w-full text-white items-center justify-center">
      {products.length > 0 ? (
        <div className="absolute grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 top-[10%] w-[60%] gap-x-5 pb-10">
          {products.map(({ id, title, image, price, stock }, index) => (
            <Link key={index} href={`/shop/${id}`}>
              <div
                className="flex flex-col items-center font-helvetica p-4 hover:rounded-lg hover:border hover:border-gray-200 bg-black-200"
                key={index}
              >
                <Image
                  src={image.src}
                  alt={title}
                  width={image.width}
                  height={image.height}
                  priority
                  className="z-50"
                />
                <span className="uppercase font-semibold mt-5 mb-2 text-center text-sm md:text-base">
                  {title}
                </span>
                {stock > 0 ? (
                  <PricePill price={price} />
                ) : (
                  <span className="uppercase font-helvetica font-bold text-gray-500">
                    Sold Out
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};

export default ShopIndex;
