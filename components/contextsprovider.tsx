"use client";

import { user } from "@prisma/client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext<any>(null);

export default function ContextProvider({
  children,
  userData,
}: Readonly<{
  children: React.ReactNode;
  userData: user;
}>) {
  const [userContext, setUserContext] = useState(userData.id);

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within the UserContext provider"
    );
  }

  return context;
}
