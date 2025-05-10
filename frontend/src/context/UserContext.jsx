import { createContext, useEffect, useState } from "react";
import { apiBase } from "../apiBase";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const shouldRefetch = window.location.href.includes("loggedIn=true");

    fetch(`${apiBase}/api/me`, {
      credentials: "include", // for sending cookies
    })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        setUser(data);

        // ✅ Clean up the URL (remove loggedIn param)
        if (shouldRefetch) {
          const url = new URL(window.location);
          url.searchParams.delete("loggedIn");
          window.history.replaceState({}, document.title, url.toString());
        }
      })
      .catch(() => setUser(null));
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
