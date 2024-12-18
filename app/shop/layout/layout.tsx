import { ReactNode } from "react";
import b1 from "/public/logos/b-white.svg";
import b2 from "/public/logos/b-black.svg";
import star from "/public/icons/star.svg";
import flag from "/public/icons/flag.svg";
import bigcar from "/public/icons/bigcar.svg";
import Image from "next/image";
import NewsSlider from "@/components/ui/NewsSlider";
interface ShopLayoutProps {
  children: ReactNode;
  showStar?: boolean;
  showFlag?: boolean;
  showCar?: boolean;
}

export const ShopLayout: React.FC<ShopLayoutProps> = ({
  children,
  showStar,
  showFlag,
  showCar,
}) => {
  return (
    <div className="h-[100vh]">
      <NewsSlider
        newsClassName="italic opacity-35 !h-7 text-[12px]"
        containerClassName="!top-8 !border-y-[1px] !py-0 !h-7  "
      />
      <Image className="absolute top-0 left-0 z-10" src={b1} alt="b-white" />
      <Image className="absolute bottom-0 right-0" src={b2} alt="b-black" />
      <div className="flex flex-col h-screen absolute items-center justify-center bg-black-200 ml-20 pt-10 space-y-14">
        {showStar && (
          <button>
            <Image src={star} alt="star" />
          </button>
        )}
        {showCar && (
          <button>
            <Image src={bigcar} alt="car" />
          </button>
        )}
        {showFlag && (
          <button>
            <Image src={flag} alt="flag" />
          </button>
        )}
      </div>
      <div className="z-20">{children}</div>
    </div>
  );
};
