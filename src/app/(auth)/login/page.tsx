import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { login } from "../actions";

function page() {
  return (
    <MaxWidthWrapper>
      <section className="p-[2rem] min-h-[95dvh] flex flex-col items-center  justify-between">
        <div>
          <Image
            src="/images/auth.jpg"
            width={2000}
            height={2000}
            alt="auth page"
          />{" "}
          <div className="flex flex-col gap-[12px]">
            <h1 className="font-extrabold text-sky-200 text-3xl text-center">
              TODOS
            </h1>
            <p className="text-gray-900/70 text-sm text-center">
              Easily manage and get your stuff done with TODOS
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <div className="flex w-full justify-center">
            <span className="text-gray-900/60 text-sm">
              Login or{" "}
              <Link href="/signup" className="text-sky-200">
                Create an account
              </Link>{" "}
              to get started.
            </span>
          </div>
          <form className="flex flex-col gap-[1rem]" action={login}>
            <span>
              <Label className="text-gray-500 text-sm" htmlFor="username">
                Username
              </Label>
              <Input
                placeholder="your username"
                id="username"
                name="username"
              />
            </span>
            <span>
              <Label className="text-gray-500 text-sm" htmlFor="password">
                Password
              </Label>
              <Input
                placeholder="your password"
                id="password"
                name="password"
              />
            </span>
            <Button className="bg-sky-200 w-full">Continue</Button>
          </form>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}

export default page;
