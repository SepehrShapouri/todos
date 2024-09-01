import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SessionProvider from "./SessionProvider";

async function Providers({ children }: { children: ReactNode }) {
  const session = await validateRequest();
  if (!session.user) redirect("/login");

  return <SessionProvider value={session}>{children}</SessionProvider>;
}

export default Providers;
