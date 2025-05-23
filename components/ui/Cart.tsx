import React from "react";
import { useCart } from "@/app/context/CartContext";
import { useModal } from "@/app/context/ModalContext";
import trash from "/public/icons/trash.svg";
import bigcar from "/public/icons/bigcar.svg";
import close from "/public/icons/close-x.svg";
import Image from "next/image";

const Cart: React.FC = () => {
  const {
    cart,
    isCartVisible,
    toggleCartVisibility,
    removeFromCart,
  } = useCart();

  const { toggleModalVisibility } = useModal();

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleBuy = () => {
    toggleCartVisibility(false);
    toggleModalVisibility(true);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-[#111111] shadow-lg transition-transform transform text-sm md:text-base ${
        isCartVisible ? "translate-x-0" : "translate-x-full"
      } w-full md:w-[400px] z-50`}
    >
      <div className="p-4 flex justify-between items-center border-b-2 border-[#333333]">
        <Image
          src={bigcar}
          alt="carrito"
          width={30}
          height={30}
          className="opacity-35"
        />
        <button
          className="text-white font-bold"
          onClick={() => toggleCartVisibility(false)}
        >
          <Image src={close} alt="Cerrar" width={20} height={20} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-white font-monument">tu carrito está vacío</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-start items-center mb-4 border-b border-[#333333] pb-2 gap-x-1"
            >
              <div>
                <Image
                  src={item.images[0].src}
                  alt={item.images[0].alt}
                  width={150}
                  height={150}
                  className="rounded"
                />
              </div>
              <div className="w-full">
                <div className="flex flex-row justify-between items-center w-full">
                  <p className="text-white font-bold ">{item.title}</p>
                  <button onClick={() => removeFromCart(item.id)}>
                    <Image src={trash} alt="Eliminar" width={20} height={20} />
                  </button>
                </div>
                <div className="flex justify-between items-center ">
                  <div>
                    <p className="text-xs">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs">X{item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="fixed bottom-0 left-0 w-full border-t">
          <div className="flex flex-col items-start mb-5 px-4 pt-4 pb-2">
            <div className="flex justify-between items-center mb-5 w-full">
              <span className="text-lg font-semibold font-monument">total estimado:</span>
              <span className="text-lg font-bold font-monument">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>

            <button
              className={`flex justify-between w-full bg-[#D9D9D9] text-black p-4 rounded-md font-bold hover:bg-white ${cart.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => cart.length > 0 ? handleBuy() : null}
            >
              comprar
            </button>
            <p className="text-xs mx-auto mt-3">
              (envio, impuestos y descuentos se calculan en el check out)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
