import React, { useState } from "react";
import { useModal } from "@/app/context/ModalContext";
import { useCart } from "@/app/context/CartContext";

const Modal: React.FC = () => {
  const { isModalVisible, toggleModalVisibility } = useModal();
  const { cart } = useCart();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string, name: string) => {
    switch (name) {
      case "name":
        setName(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const redirectToBuy = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const errors = await checkErrors();

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    fetch("/api/draft_orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: cart, name, lastName: lastname, email }),
    })
      .then((res) => res.json())
      .then((checkout) => {
        setLoading(true);
        window.location.href = checkout;
      })
      .catch((e) => {
        console.error(e);
        setErrors(["ocurrio un error. intentalo de nuevo."]);
      });
  };

  const checkErrors = async () => {
    const array = [];

    if (!name) {
      array.push("campo nombre vacio.");
    }

    if (!lastname) {
      array.push("campo apellido vacio.");
    }

    if (!email) {
      array.push("campo email vacio.");
    }

    return array;
  };

  return (
    <div
      className={`fixed h-full w-full bg-black bg-opacity-80 z-[100] ${
        isModalVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col p-4 w-11/12 h-4/6 md:w-6/12 xl:w-4/12 md:h-80 bg-black border border-white font-monument">
          {!loading ? (
            <div>
              <div className="flex flex-row items-center justify-between w-full text-xl">
                <span className=" text-white font-bold">
                  termina tu compra wachin
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => toggleModalVisibility(false)}
                >
                  x
                </span>
              </div>
              {errors.length > 0 && (
                <div className="flex flex-row gap-x-2 w-full flex-wrap">
                  <span className="text-red-500 text-xs">Error:</span>
                  {errors.map((error, index) => (
                    <span key={index} className="text-red-500 text-xs">
                      {error}
                    </span>
                  ))}
                </div>
              )}
              <form onSubmit={redirectToBuy} className="mt-6">
                <div className="flex flex-col gap-y-6">
                  <div className="flex flex-col items-center w-full h-full gap-y-5">
                    <div className="my-4 md:my-0 text-lg bg-white text-black w-[20rem] md:w-[25rem] h-10 py-1 px-4 rounded-sm">
                      <input
                        type="text"
                        placeholder="tu nombre"
                        value={name}
                        onChange={(e) => handleChange(e.target.value, "name")}
                        name="name"
                        id="name"
                        className="md:w-full md:h-full text-xl md:text-base font-bold focus:outline-none"
                      />
                    </div>
                    <div className="my-4 md:my-0 text-lg bg-white text-black w-[20rem] md:w-[25rem] h-10 py-1 px-4 rounded-sm">
                      <input
                        type="text"
                        placeholder="tu apellido"
                        value={lastname}
                        onChange={(e) =>
                          handleChange(e.target.value, "lastname")
                        }
                        name="lastname"
                        id="lastname"
                        className="md:w-full md:h-full text-xl md:text-base font-bold focus:outline-none"
                      />
                    </div>
                    <div className="my-4 md:my-0 text-lg bg-white text-black w-[20rem] md:w-[25rem] h-10 py-1 px-4 rounded-sm">
                      <input
                        type="email"
                        placeholder="tu mail"
                        value={email}
                        onChange={(e) => handleChange(e.target.value, "email")}
                        name="email"
                        id="email"
                        className="md:w-full md:h-full text-xl md:text-base font-bold focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-end items-center gap-x-8">
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={() => toggleModalVisibility(false)}
                    >
                      seguir comprando
                    </span>
                    <button
                      type="submit"
                      className="text-green-500 cursor-pointer"
                    >
                      finalizar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            (() => {
              const letters = "BLOCKSTAR".split("");
              return (
                <div className="flex justify-center items-center text-white font-helvetica h-full w-full">
                  <div className="text-4xl font-bold">
                    {letters.map((letter, index) => (
                      <span
                        key={index}
                        className="inline-block opacity-0 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
