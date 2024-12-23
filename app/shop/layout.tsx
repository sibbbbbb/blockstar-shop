"use client";

import b1 from "/public/logos/b-white.svg";
import b2 from "/public/logos/b-black.svg";
import home from "/public/icons/home.svg";
import flag from "/public/icons/flag.svg";
import bigcar from "/public/icons/bigcar.svg";
import Image from "next/image";
import NewsSlider from "@/components/ui/NewsSlider";
import { usePathname, useParams } from "next/navigation";
import { redirect } from 'next/navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { id: queryId } = useParams();

  const getHiddenIcons = () => {
    if (pathname === "/shop") return ["home"];
    if (pathname.startsWith("/shop") && queryId) return [];
    return ["home"];
  };

  const hiddenIcons = getHiddenIcons();
  const icons = [
    {
      icon: home,
      name: "home",
      action: () => redirect('/shop')
    },
    {
      icon: bigcar,
      name: "car",
    },
    {
      icon: flag,
      name: "flag",
    },
  ];

  return (
    <div className="h-screen-dvh">
      <NewsSlider
        newsClassName="italic opacity-35 !h-7 text-[12px]"
        containerClassName="!top-8 !border-y-[1px] !py-0 !h-7  "
      />
      <Image
        className="absolute top-0 left-0 w-[150px] h-[150px] lg:w-[225px] lg:h-[225px] z-10"
        src={b1}
        alt="b-white"
      />
      <Image
        className="absolute bottom-0 right-0 w-[150px] h-[150px] lg:w-[225px] lg:h-[225px] -z-10"
        src={b2}
        alt="b-black"
      />
      <div className="flex flex-col h-screen-dvh absolute items-center justify-center bg-black-200 ml-5 md:ml-20 pt-10 space-y-14 z-50">
        {icons.map((icon, index) => {
          if (hiddenIcons.includes(icon.name)) return null;
          return (
            <button key={index} className="cursor-pointer" onClick={icon.action}>
              <Image src={icon.icon} alt={icon.name}  />
            </button>
          );
        })}
      </div>
      <div className="z-50">{children}</div>
    </div>
  );
}
