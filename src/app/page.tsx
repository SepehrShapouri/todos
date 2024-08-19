"use client";

import CustomDatePicker from "@/components/AnimatedDatePicker";
import CreateTodo from "@/components/createTodo/CreateTodo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NoTodosComponent from "@/components/NoTodosComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getTodos, hanleTodoState } from "./actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function page() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { refresh } = useRouter();
  const queryClient = useQueryClient();
  const formattedDate = selectedDate.toISOString().split("T")[0];
  const {
    data: todos,
    refetch,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await getTodos(formattedDate),
  });
  useEffect(() => {
    refetch();
  }, [selectedDate]);

  const { mutate: changeTodoState, isPending: isChangingTodoState } =
    useMutation({
      mutationFn: hanleTodoState,
      mutationKey: ["handle-todo-state"],
    });
  function handleCompleteTodo(state: boolean, id: string) {
    const res = changeTodoState(
      { state, id },
      {
        onSuccess: (res) => {
          console.log(res);
          toast.success("added new task"), refresh();
          refetch();
          queryClient.invalidateQueries({ queryKey: ["todos"] });
          queryClient.refetchQueries({ queryKey: ["todos"] });
        },
      }
    );
  }
  return (
    <>
      <MaxWidthWrapper className="min-h-[93svh]">
        <CustomDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {isLoading || isRefetching || isChangingTodoState ?       <div className="h-[70svh] w-full flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-sky-200 shrink-0" />
      </div> :<>        {todos?.length ? (
          <h1 className="py-4 text-muted-foreground">You have {todos!?.length} tasks for today!</h1>
        ) : null}
        <ScrollArea className="h-[500px] w-full">
          {todos?.length ? (
            <div className="flex flex-col gap-3  max-h-[60svh] overflow-scroll pb-[2rem] items-center shrink-0">
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
                        onCheckedChange={(e) =>
                          handleCompleteTodo(Boolean(e), item.id)
                        }
                      />{" "}
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
        </ScrollArea></>}
      </MaxWidthWrapper>
      <CreateTodo selectedDate={new Date(selectedDate)} />
    </>
  );
}

export default page;
