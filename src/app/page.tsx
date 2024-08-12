//bg-sky-200
"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import CustomDatePicker from "@/components/AnimatedDatePicker";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import toLocalDateShort from "@/lib/persian";
import { cn } from "@/lib/utils";
import { Pen, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const TODOS = [
  {
    id: 1,
    color: "sky-200",
    title: "برو خرید",
    description: "خرید میوه",
    time: "12:00",
    date: "26th",
    completed: false,
  },
  {
    id: 2,
    color: "sky-200",
    title: "برو خرید",
    description: "خرید میوه",
    time: "12:00",
    date: "26th",
    completed: false,
  },
  {
    id: 3,
    color: "sky-200",
    title: "برو خرید",
    description: "خرید میوه",
    time: "12:00",
    date: "26th",
    completed: false,
  },
  {
    id: 4,
    color: "sky-200",
    title: "برو خرید",
    description: "خرید میوه",
    time: "12:00",
    date: "26th",
    completed: false,
  },
  {
    id: 5,
    color: "sky-200",
    title: "برو خرید",
    description: "خرید میوه",
    time: "12:00",
    date: "26th",
    completed: false,
  },
  {
    id: 6,
    color: "sky-200",
    title: "برو خرید",
    description: "خرید میوه",
    time: "12:00",
    date: "26th",
    completed: false,
  },
];
function page() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [addTodoModal, setAddTodoModal] = useState<boolean>(false);
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
        {TODOS.map((item) => {
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
      <div className="w-full h-[100px] fixed bottom-10 flex items-center justify-center">
        <span
          className="w-[70px] h-[70px] rounded-full shrink-0 bg-sky-200 flex items-center justify-center hover:bg-blue-300 transition-colors shadow-lg drop-shadow-md"
          onClick={() => setAddTodoModal(true)}
        >
          <PlusIcon className="w-8 h-8 font-extrabold text-white" />
        </span>
      </div>
      <Drawer open={addTodoModal}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add todo</DrawerTitle>
            <DrawerDescription>
              Add a new todo to your list for the due date
            </DrawerDescription>
          </DrawerHeader>
          <div>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Buy groceries" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="due-hours">Due Time (Hours)</Label>
                  <Select id="due-hours">
                    <SelectTrigger>
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={i.toString().padStart(2, "0")}
                        >
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due-minutes">Minutes</Label>
                  <Select id="due-minutes">
                    <SelectTrigger>
                      <SelectValue placeholder="Select minutes" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={i.toString().padStart(2, "0")}
                        >
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select id="color">
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-red-500" />
                        Red
                      </div>
                    </SelectItem>
                    <SelectItem value="green">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-green-500" />
                        Green
                      </div>
                    </SelectItem>
                    <SelectItem value="blue">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-blue-500" />
                        Blue
                      </div>
                    </SelectItem>
                    <SelectItem value="yellow">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-yellow-500" />
                        Yellow
                      </div>
                    </SelectItem>
                    <SelectItem value="purple">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-purple-500" />
                        Purple
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select id="category">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="chores">Chores</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </div>
          <DrawerFooter>
            <Button className="bg-sky-200">Add</Button>
            <DrawerClose>
              <Button variant="secondary" className="w-full">Never mind</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </MaxWidthWrapper>
  );
}

export default page;