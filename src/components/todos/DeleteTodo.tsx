'use client'
import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useDeleteTodo } from "./mutations";
type DeleteTodoProps = {
  todoId: string;
  selectedDate:Date
};
function DeleteTodo({ todoId,selectedDate }: DeleteTodoProps) {
    const {mutate,isPending} = useDeleteTodo(selectedDate)
  return (
    <Button variant="ghost" size="icon" onClick={()=>mutate(todoId)} iconLoading={isPending}>
      <Trash  className="size-4 text-destructive"/>
    </Button>
  );
}

export default DeleteTodo;
