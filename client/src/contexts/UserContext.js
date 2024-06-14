import { createContext } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  return (
    <UserContext.Provider value={{
      username: "john",
      token: "token",
      id: 1
    }}>
      {children}
    </UserContext.Provider>
  )
} 