import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface UserCredentials {
  name: string;
  password: string;
}

interface User {
  name: string;
}

const AuthContext = createContext<{
  user: User | null;
  login: (credentials: UserCredentials) => void;
} | null>(null);

function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/users/current", {
      method: "GET",
    })
      .then(async (response) => {
        if (response.ok) {
          const user = (await response.json()) as User;
          setUser(user);
        }
      })
      .catch((error) => {
        console.error("Get current user failed:", error);
      });
  }, []);

  const login = useCallback((credentials: UserCredentials) => {
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then(async (response) => {
        if (response.ok) {
          const user = (await response.json()) as User;
          setUser(user);
          alert("Login successful!");
        } else {
          if (response.status === 401) {
            alert("Invalid credentials.");
          } else {
            alert("Login failed. Please try again.");
          }
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
      });
  }, []);

  const context = useMemo(() => {
    return { user, login };
  }, [user, login]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return value;
}

export { AuthProvider, useAuth };
