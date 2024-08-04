import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <MaxWidthWrapper>
      <section className="p-[2rem] min-h-[85dvh] flex flex-col items-center justify-between">
        <Image
          src="/images/auth.jpg"
          width={2000}
          height={2000}
          alt="auth page"
        />
        <div className="flex flex-col gap-[12px]">
          <h1 className="font-extrabold text-sky-200 text-3xl text-center">TODOS</h1>
          <p className="text-gray-900/70 text-sm text-center">
            Easily manage and get your stuff done with TODOS
          </p>
        </div>
        <div>
        <span className="text-gray-900/80">
          Login or <Link href="/signup" className="text-blue-500">Create and account</Link> to get started.
        </span>
        
        </div>
      </section>
    </MaxWidthWrapper>
  );
}

export default page;
