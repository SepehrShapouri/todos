"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function ServerSubmitButton({
  className,
  title = "Send message",
  loadingTitle
}: {
  className?: string;
  title: string;
  loadingTitle:string
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className} isLoading={pending} >
      {pending ? loadingTitle : title}
      
    </Button>
  );
}
