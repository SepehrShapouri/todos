"use client";

import CustomDatePicker from "@/components/AnimatedDatePicker";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NoTodosComponent from "@/components/NoTodosComponent";
import CompleteTodo from "@/components/todos/CompleteTodo";
import CreateTodo from "@/components/todos/createTodo/CreateTodo";
import DeleteTodo from "@/components/todos/DeleteTodo";
import EditTodo from "@/components/todos/EditTodo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getTodos } from "./actions";

function page() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const formattedDate = selectedDate.toISOString().split("T")[0];
  const {
    data: todos,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["todos", new Date(selectedDate).toLocaleDateString()],
    queryFn: async () => await getTodos(formattedDate),
  });
  useEffect(() => {
    refetch();
  }, [selectedDate]);
  return (
    <>
      <MaxWidthWrapper className="min-h-[93svh]">
        <CustomDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <>
          {" "}
          {!isLoading && todos?.length ? (
            <h1 className="py-4 text-muted-foreground">
              You have {todos!?.filter((item) => !item.completed)?.length || 0}{" "}
              tasks for today!
            </h1>
          ) : null}
          <ScrollArea className="h-[600px] w-full">
            {isLoading && <div className="w-full h-[90svh] flex items-center justify-center"><Loader2 className="text-sky-200 animate-spin size-12"/></div>}
            {!isLoading && todos?.length ? (
              <div className="flex flex-col gap-3  pb-[2rem] items-center shrink-0">
                {todos?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`bg-white w-full rounded-r-2xl rounded-l-[3px] h-[60px] shrink-0 flex justify-between shadow-sm items-center px-4 border-l-4 border-l-${item.color}`}
                    >
                      <div className="flex items-center gap-2">
                        <CompleteTodo
                          completed={item.completed}
                          todoId={item.id}
                          keyDate={new Date(selectedDate).toLocaleDateString()}
                        />
                        <DeleteTodo
                          todoId={item.id}
                          keyDate={new Date(selectedDate).toLocaleDateString()}
                        />
                        <EditTodo
                          todoId={item.id}
                          selectedDate={new Date(selectedDate)}
                          keyDate={new Date(selectedDate).toLocaleDateString()}
                        />
                        <p
                          className={cn("", {
                            "line-through opacity-50": item.completed,
                          })}
                        >
                          {item.title}
                        </p>
                      </div>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <NoTodosComponent />
            )}
          </ScrollArea>
        </>
      </MaxWidthWrapper>
      <CreateTodo selectedDate={new Date(selectedDate)} />
    </>
  );
}

export default page;
