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
        "h-full min-h-[100dvh] mx-auto w-full max-w-[512px] px-2.5 bg-sky-50/20",
        className
      )}
    >
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
