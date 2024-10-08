import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import AuthForm from "../AuthForm";
function page() {
  return (
    <MaxWidthWrapper className="from-white to-white">
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
              Create an account or{" "}
              <Link href="/login" className="text-sky-200">
                Login
              </Link>{" "}
              to get started.
            </span>
          </div>
          <AuthForm formType="signup"/>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}

export default page;
