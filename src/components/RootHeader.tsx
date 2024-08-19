import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { validateRequest } from "@/lib/validate-request";

async function RootHeader() {
  const { user } = await validateRequest();
  console.log(user);
  return (
    <div className="w-screen h-[60px] border-b border-b-zinc-50 bg-white dark:bg-zinc-800 p-4 rounded-b-md flex items-center justify-center">
      <div className="w-full h-full flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="#" />
            <AvatarFallback>{user!?.username![0]}</AvatarFallback>
          </Avatar>
          <span className="flex flex-col ">
            <p className="text-sm">{user!?.username!}</p>
            <p className="text-xs text-gray-400">{user!?.email!}</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default RootHeader;
