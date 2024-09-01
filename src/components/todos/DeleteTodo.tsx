'use client'
import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useDeleteTodo } from "./mutations";
type DeleteTodoProps = {
  todoId: string;
  keyDate:string
};
function DeleteTodo({ todoId,keyDate }: DeleteTodoProps) {
    const {mutate,isPending} = useDeleteTodo(keyDate)
  return (
    <Button variant="ghost" size="icon" onClick={()=>mutate(todoId)} iconLoading={isPending}>
      <Trash  className="size-4 text-destructive"/>
    </Button>
  );
}

export default DeleteTodo;
