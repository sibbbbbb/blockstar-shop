"use client"
import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { PricePill } from '@/components/ui/PricePill';
import LoadingAnimation from "@/components/ui/LoadingAnimation";

type Variant = {
    inventory_quantity: number;
    price: number;
}

type Img = {
    src: string;
    height: number;
    width: number;
    alt: string;
}

type Product = {
    id: number;
    title: string;
    image: Img;
    price: number;
    variants: Variant[];
}

const ShopIndex: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products/list')
            .then((res) => res.json())
            .then(({ products }) => {
                const formatedProducts = products.map(({ id, title, variants, image }: Product) => {
                    return {
                        id,
                        title,
                        image: {
                            src: image.src,
                            height: image.height,
                            width: image.width,
                            alt: image.alt
                        },
                        price: variants.reduce((acc: number, curr: Variant) => curr.price > acc ? curr.price : acc, 0),
                    }
                });
                setProducts(formatedProducts);
            })
    }, []);


    return (
        <div className="relative flex flex-col h-screen w-screen text-white items-center justify-center">
                {
                    products.length > 0 
                    ? (
                        <div className="absolute grid grid-cols-3 top-[15%] w-[60%] gap-x-20">
                            {
                                products.map(({ id, title, image, price }, index) => (
                                    <Link key={index} href={`/shop/${id}`}>
                                        <div className="flex flex-col items-center font-helvetica p-4 hover:rounded-lg hover:border hover:border-gray-200 " key={index}>
                                            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
                                            <span className='uppercase font-semibold mt-5 mb-2'>{title}</span>
                                            <PricePill price={price} />
                                        </div>
                                    </Link>
                                ))
                                
                            }
                        </div>
                    ) 
                    : <LoadingAnimation />
                }
        </div>
    );
};

export default ShopIndex;