import { createContext, useEffect, useState } from "react";
import { apiBase } from "../apiBase";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${apiBase}/api/me`, {
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) {
          console.warn("User not logged in");
          return null;
        }
        return res.json();
      })
      .then(data => setUser(data))
      .catch((err) => {
        console.error("UserContext fetch error:", err);
        setUser(null);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
