"use client";

import { UserContext } from "@/lib/contexts";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function ContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userContext, setUserContext] = useState("default context value");

  return (
    <SessionProvider basePath="/login/auth">
      <UserContext.Provider value={userContext}>
        {children}
      </UserContext.Provider>
    </SessionProvider>
  );
}
