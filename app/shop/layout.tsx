import b1 from "/public/logos/b-white.svg";
import b2 from "/public/logos/b-black.svg";
import star from "/public/icons/star.svg";
import flag from "/public/icons/flag.svg";
import car from "/public/icons/car.svg";
import Image from "next/image";
import { NewsSlider } from "@/components/ui/NewsSlider";

export default function RootLayout({
  children,
  showStar,
  showFlag,
  showCar,
}: Readonly<{
  children: React.ReactNode;
  showStar?: boolean;
  showFlag?: boolean;
  showCar?: boolean;
}>) {
  return (
    <div className="h-[100vh]">
      <NewsSlider newsClassName="italic opacity-35" />
      <Image
        className="absolute top-0 left-0 z-10"
        src={b1}
        alt="b-white"
        width={315}
        height={315}
      />
      <Image
        className="absolute bottom-0 right-0"
        src={b2}
        alt="b-black"
        width={315}
        height={315}
      />
      <div className="flex flex-col h-screen absolute items-center justify-center bg-black-200 ml-20 space-y-20">
        {showStar && (
          <button>
            <Image src={star} alt="star" width={30} height={30} />
          </button>
        )}
        {showCar && (
          <button>
            <Image src={car} alt="car" width={30} height={30} />
          </button>
        )}
        {showFlag && (
          <button>
            <Image src={flag} alt="flag" width={30} height={30} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

