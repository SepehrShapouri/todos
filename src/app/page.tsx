"use client";

import CustomDatePicker from "@/components/AnimatedDatePicker";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NoTodosComponent from "@/components/NoTodosComponent";
import CreateTodo from "@/components/todos/createTodo/CreateTodo";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Pen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { getTodos } from "./actions";
import DeleteTodo from "@/components/todos/DeleteTodo";
import EditTodo from "@/components/todos/EditTodo";

function page() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const formattedDate = selectedDate.toISOString().split("T")[0];
  const {
    data: todos,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["todos",selectedDate],
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
          {todos?.length ? (
            <h1 className="py-4 text-muted-foreground">
              You have {todos!?.filter((item) => !item.completed)?.length || 0}{" "}
              tasks for today!
            </h1>
          ) : null}
          <ScrollArea className="h-[600px] w-full">
            {todos?.length ? (
              <div className="flex flex-col gap-3  pb-[2rem] items-center shrink-0">
                {todos?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`bg-white w-full rounded-r-2xl rounded-l-[3px] h-[60px] shrink-0 flex justify-between shadow-sm items-center px-4 border-l-4 border-l-${item.color}`}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={item.completed}
                          onChange={(e) => console.log(e)}
                          
                        />
                        <DeleteTodo todoId={item.id} selectedDate={new Date(selectedDate)}/>
                        <EditTodo todoId={item.id} selectedDate={new Date(selectedDate)}/>
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
      <CreateTodo
        selectedDate={new Date(selectedDate)}
      />
    </>
  );
}

export default page;
