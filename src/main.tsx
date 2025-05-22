import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Products from "./routes/products/Products";
import ProductsLoader from "./routes/products/ProductsLoader";
import Payment from "./routes/payment/Payment";
import Cart from "./routes/cart/Cart";
import { CartProvider } from "./hooks/Cart";
import { AuthProvider } from "./hooks/Auth";
import App from "./App";
import Login from "./routes/user/Login";
import Register from "./routes/user/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Products />,
        loader: ProductsLoader,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
