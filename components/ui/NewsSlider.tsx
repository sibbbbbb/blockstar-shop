"use client";

import { useEffect, useState } from "react";
import { getNews } from "@/api/news";
import Marquee from "react-fast-marquee";

type News = {
  title: any;
  date: any;
};

interface NewsSliderProps {
  containerClassName?: string;
  newsClassName?: string;
}

export const NewsSlider: React.FC<NewsSliderProps> = ({
  containerClassName,
  newsClassName,
}) => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    getNews().then((news: News[]) => {
      setNews(news);
    });
  }, []);

  return (
    <div
      className={`absolute top-4 md:top-10 w-screen border-t-2 border-b-2 py-2 border-[#363636] ${containerClassName}`}
    >
      <Marquee>
        {news.map(({ title, date }, index) => (
          <div
            className={`flex items-center justify-center text-[#363636] md:text-[#CCCCCC] font-monument uppercase ${newsClassName}`}
            key={index}
          >
            <span>[</span>
            <span>{date}</span>
            <span className="mx-2">{title}</span>
            <span>]</span>
            <span className="mx-2">-</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};
