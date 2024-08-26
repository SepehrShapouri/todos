"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session, User } from "lucia";
import { createContext, useContext } from "react";

type SessionContext = {
  user: User;
  session: Session;
};

const SessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  const client = new QueryClient();
  return (
    <SessionContext.Provider value={value}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </SessionContext.Provider>
  );
}

export function useSession() {
  const sessionContext = useContext(SessionContext);
  if (!sessionContext)
    throw new Error("useSession must be used inside a session provider");
  return sessionContext;
}
