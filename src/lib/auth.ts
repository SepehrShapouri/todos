import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { db } from "../../db";
const adapter = new PrismaAdapter(db.session, db.user); // your adapter

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes: DatabaseUserAttributes) => {
    return {
      username: attributes.username,
      id: attributes.id,
      name:attributes.name,
      lastname:attributes.lastname,
      updatedAt: attributes.updatedAt,
      createdAt: attributes.createdAt,
      email: attributes.email,
      password_hash: attributes.password_hash,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
interface DatabaseUserAttributes {
  id: string;
  email: string;
  username: string;
  name:string;
  lastname:string;
  password_hash: string;
  createdAt: Date;
  updatedAt: Date;
}
