import CustomDatePicker from "@/components/AnimatedDatePicker";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

function page() {
  return (
    <MaxWidthWrapper>
      <div className="w-full p-6 flex items-center justify-center flex-col gap-2">
        <h1 className="text-blue-200 font-extrabold text-3xl font-mono">
          My Todos
        </h1>
        <p className="text-sm f text-zinc-600/70 font-mono">
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
            day: "2-digit",
          })}
        </p>
      </div>
      <CustomDatePicker/>
      <div className="w-full h-[100px] border-t border-b border-zinc-100 flex items-center justify-between">
        <span className="rounded-2xl h-[70px] w-[70px] bg-blue-200 text-white flex flex-col items-center justify-center ">
          <p>WED</p>
          <p>10</p>
        </span>
        <span className="rounded-2xl h-[70px] w-[70px] text-zinc-400 flex flex-col items-center justify-center ">
          <p>WED</p>
          <p>10</p>
        </span>
        <span className="rounded-2xl h-[70px] w-[70px] text-zinc-400 flex flex-col items-center justify-center ">
          <p>WED</p>
          <p>10</p>
        </span>
        <span className="rounded-2xl h-[70px] w-[70px] text-zinc-400 flex flex-col items-center justify-center ">
          <p>WED</p>
          <p>10</p>
        </span>
        <span className="rounded-2xl h-[70px] w-[70px] text-zinc-400 flex flex-col items-center justify-center ">
          <p>WED</p>
          <p>10</p>
        </span>
      </div>
      <div className="w-full h-[100px] fixed bottom-0 flex items-center justify-center">
        <span className="w-[70px] h-[70px] rounded-full shrink-0 bg-blue-200 flex items-center justify-center hover:bg-blue-300 transition-colors shadow-lg drop-shadow-md">
          <PlusIcon className="w-8 h-8 font-extrabold text-white" />
        </span>
      </div>
    </MaxWidthWrapper>
  );
}

export default page;
