import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "h-full min-h-[91.9svh] mx-auto w-full max-w-[512px] px-2.5 bg-gradient-to-b from-white to-sky-50",
        className
      )}
    >
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
