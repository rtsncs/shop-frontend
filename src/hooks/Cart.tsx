import { createContext, useContext, useMemo, useState } from "react";
import Product from "../models/Product";

interface Cart {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<Cart | null>(null);

function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = useMemo(
    () => (item: Product) => {
      setCart((prevCart) => [...prevCart, item]);
    },
    [],
  );

  const removeFromCart = useMemo(
    () => (id: number) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    },
    [],
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return value;
}

export { CartProvider, useCart };
