import React, { ReactNode } from "react";
import SessionProvider from "./SessionProvider";
import { redirect } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { validateRequest } from "@/lib/validate-request";

async function Providers({ children }: { children: ReactNode }) {
  const session = await validateRequest();
  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
 {children}
    </SessionProvider>
  );
}

export default Providers;
