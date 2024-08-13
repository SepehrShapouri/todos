//bg-sky-200
"use client";

import CustomDatePicker from "@/components/AnimatedDatePicker";
import { createTodo } from "@/components/createTodo/actions";
import CreateTodo from "@/components/createTodo/CreateTodo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import toLocalDateShort from "@/lib/persian";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Pen, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getTodos } from "./actions";

function page() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const formattedDate = selectedDate.toISOString().split("T")[0]
  console.log(formattedDate)
  const {data:todos,refetch} = useQuery({
    queryKey:['todos']
    ,
    queryFn:async () => await getTodos(formattedDate)
  })
  useEffect(()=>{refetch()},[selectedDate])
  return (
    <MaxWidthWrapper>
      <div className="w-full p-6 flex items-center justify-center flex-col gap-2">
        <h1 className="text-sky-200 font-extrabold text-3xl font-mono">
          My Todos
        </h1>
      </div>
      <CustomDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="flex flex-col gap-3 mt-4 max-h-[60svh] overflow-scroll pb-[2rem] items-center">
        <h1 className="text-xs px-2 text-sky-200 self-start">Todos</h1>
        {todos?.map((item) => {
          return (
            <Card className="w-full max-w-md font-vazir" dir="rtl">
              <CardContent className="grid gap-2 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-${item.color}`} />
                    <h3
                      className={cn("text-lg font-semibold text-zinc-600", {
                        "line-through opacity-60": false,
                      })}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <Checkbox id="todo-1" defaultChecked={false} className="" />
                    <Pen className="w-4 h-4 fill-sky-200 text-sky-200" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>Due today at {item.time}</div>
                  <div>{toLocalDateShort(selectedDate)}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <CreateTodo selectedDate={new Date(selectedDate)}/>
    </MaxWidthWrapper>
  );
}

export default page;
