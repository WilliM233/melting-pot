import { createContext, useEffect, useState, ReactNode } from "react";
import { apiBase } from "../apiBase";
import { AppUser } from "../types/user";

interface UserContextType {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
}

//export const UserContext = createContext(null);
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: ReactNode;
}

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<AppUser | null>(null);

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
          const url = new URL(window.location.href);
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
