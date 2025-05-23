"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

// Define la estructura del producto en el carrito
type Img = {
  src: string;
  height: number;
  width: number;
  alt: string;
};

interface CartItem {
  id: number;
  title: string;
  images: Img[];
  price: number;
  stock: number;
  quantity: number;
}

// Define la estructura del contexto
interface CartContextType {
  cart: CartItem[];
  cartId: string;
  isCartVisible: boolean;
  cartLink: string;
  setShopifyLink: (link: string) => void;
  setCartShopifyId: (id: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  toggleCartVisibility: (isVisible?: boolean) => void;
}

// Crea el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Proveedor del contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string>("");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartLink, setCartLink] = useState<string>("");

  // Agregar un producto al carrito
  const addToCart = async (item: CartItem) => {
    console.log(item)
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevCart, item];
    });
    setIsCartVisible(true); // Mostrar el carrito al agregar un producto
  };

  const setCartShopifyId = (id: string) => {
    setCartId(id);
  };

  const setShopifyLink = (link: string) => {
    setCartLink(link);
  };

  // Eliminar un producto del carrito
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Alternar la visibilidad del carrito
  const toggleCartVisibility = (isVisible?: boolean) => {
    setIsCartVisible(isVisible ?? !isCartVisible);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        isCartVisible,
        cartLink,
        addToCart,
        setCartShopifyId,
        setShopifyLink,
        removeFromCart,
        clearCart,
        toggleCartVisibility,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
