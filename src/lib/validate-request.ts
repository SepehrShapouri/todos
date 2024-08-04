import { User } from "@prisma/client";
import { lucia } from "./auth";
import { cache } from "react";
import { cookies } from "next/headers";
import  type {Session} from "lucia"
export const validateRequest = cache(
    async (): Promise<
      { user: User; session: Session } | { user: null; session: null }
    > => {
      const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
      if (!sessionId) {
        return {
          user: null,
          session: null,
        };
      }
  
      const result = await lucia.validateSession(sessionId);
      // next.js throws when you attempt to set cookie when rendering page
      try {
        if (result.session && result.session.fresh) {
          const sessionCookie = lucia.createSessionCookie(result.session.id);
          cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
          );
        }
        if (!result.session) {
          const sessionCookie = lucia.createBlankSessionCookie();
          cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
          );
        }
      } catch {}
      return result;
    }
  );
  