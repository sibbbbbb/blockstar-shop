"use client";

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import Image from "next/image";
import NewsSlider from "@/components/ui/NewsSlider";
import TimeLeft from "@/components/ui/TimeLeft";

type Message = {
  message: string;
  color: string;
};

export default function Home() {
  const [showMessage, setShowMessage] = useState<Message | null>(null);
  const [email, setEmail] = useState<string>("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const mail = e.target.value;
    setEmail(mail);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setShowMessage(null);

      if (!email.includes("@")) {
        return setShowMessage({
          message: "ingresa un mail valido.",
          color: "text-red-500",
        });
      }

      fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      setShowMessage({
        message: "listo, registrado. estate atento.",
        color: "text-green-500",
      });
    } catch (e) {
      console.error(e);
      setShowMessage({
        message: "ocurrio un error. intentalo de nuevo.",
        color: "text-red-500",
      });
    }
  };

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return (
    <div className="relative h-screen-dvh w-screen overflow-hidden bg-black text-white">
      <NewsSlider />
      <div className="absolute top-16 md:top-[45%] w-full flex flex-col md:flex-row items-center justify-start md:justify-center gap-x-40 gap-y-4">
        <div className="relative w-[12rem] md:w-[8rem] h-[12rem] md:h-[8rem]">
          <Image src="/logos/B RELLENO.svg" alt="Blockstar" fill />
        </div>
        <TimeLeft />
        {showInput ? (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row items-start md:items-center justify-between gap-x-5 my-4 md:my-0 text-lg bg-white text-black w-[22rem] md:w-[25rem] h-24 md:h-10 py-1 px-4 rounded-sm">
              <input
                type="text"
                placeholder="tu mail"
                value={email}
                ref={inputRef}
                onChange={handleChange}
                name="email"
                id="mail"
                className="md:w-full md:h-full text-xl md:text-base font-bold focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-start md:items-center justify-center w-6 md:w-10 h-full cursor-pointer"
              >
                <div className="relative w-[2rem] md:w-[1rem] h-[2rem] md:h-[1rem]">
                  <Image src="/icons/arrow-right.svg" alt="Blockstar" fill />
                </div>
              </button>
            </div>
            {showMessage && (
              <span className={`text-[10px] ${showMessage.color}`}>
                {showMessage.message}
              </span>
            )}
          </form>
        ) : (
          <div
            className="flex flex-row items-start md:items-center justify-between gap-x-5 my-4 md:my-0 text-lg bg-white text-black w-[22rem] md:w-[25rem] h-24 md:h-10 py-1 px-4 rounded-sm cursor-pointer"
            onClick={() => {
              setShowInput(true);
            }}
          >
            <span className="text-xl md:text-base font-bold">
              unite al club
            </span>
            <div className="relative w-[2rem] md:w-[1rem] h-[2rem] md:h-[1rem]">
              <Image src="/icons/arrow-right.svg" alt="Blockstar" fill />
            </div>
          </div>
        )}
      </div>
      <div className="absolute text-white -bottom-32 -right-28 md:-bottom-64 md:-right-48">
        <div className="relative h-[20rem] sm:h-[20rem] md:h-[40rem] w-[20rem] sm:w-[20rem] md:w-[40rem]">
          <Image src="/logos/B OUTLINE.svg" alt="Blockstar logo" fill />
        </div>
      </div>
    </div>
  );
}
