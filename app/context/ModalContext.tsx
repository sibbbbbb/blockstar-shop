"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  // useEffect,
} from "react";

// Define la estructura del producto en el carrito
interface UserInfo {
  name: string;
  last_name: string;
  email: string;
}

// Define la estructura del contexto
interface ModalContextType {
  userInfo: UserInfo;
  isModalVisible: boolean;
  clearModal: () => void;
  toggleModalVisibility: (isVisible?: boolean) => void;
}

// Crea el contexto
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Proveedor del contexto
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<userInfo>({ name: "", last_name: "", email: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Vaciar el carrito
  const clearModal = () => {
    setUserInfo({ name: "", last_name: "", email: "" });
  };

  // Alternar la visibilidad del carrito
  const toggleModalVisibility = (isModalVisible?: boolean) => {
    setIsModalVisible(isModalVisible ?? !isModalVisible);
  };

  return (
    <ModalContext.Provider
      value={{
        userInfo,
        isModalVisible,
        clearModal,
        toggleModalVisibility,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal debe usarse dentro de un ModalProvider");
  }
  return context;
};
