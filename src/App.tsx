import { Link, Outlet } from "react-router";
import { Suspense } from "react";
import { useCart } from "./hooks/Cart";
import { useAuth } from "./hooks/Auth";

function App() {
  const { cart } = useCart();
  const { user } = useAuth();

  return (
    <Suspense fallback={<p>Loading</p>}>
      {user && <p>Hello, {user.name}!</p>}
      <nav>
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <Link to="/">Products</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
      </nav>
      <Outlet />
    </Suspense>
  );
}

export default App;
