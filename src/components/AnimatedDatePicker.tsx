//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import toLocalDateShort, { toEnglishNumbers } from "@/lib/persian";
import { cn } from "@/lib/utils";

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [visibleDays, setVisibleDays] = useState([]);
  const [animationComplete, setAnimationComplete] = useState(true);

  useEffect(() => {
    // Initialize visible days when the component first renders
    const initializeVisibleDays = () => {
      const days = [];
      for (let i = -2; i <= 2; i++) {
        days.push(addDays(selectedDate, i));
      }
      setVisibleDays(days);
    };

    initializeVisibleDays();
  }, []);

  useEffect(() => {
    // Update the visible days based on the selected date
    const updateVisibleDays = () => {
      const days = [];
      const selectedIndex = visibleDays.findIndex(
        (date) =>
          format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      );

      if (selectedIndex === 0) {
        // Move the array backward by one day
        for (let i = -3; i <= 1; i++) {
          days.push(addDays(selectedDate, i));
        }
      } else if (selectedIndex === 4) {
        // Move the array forward by one day
        for (let i = -1; i <= 3; i++) {
          days.push(addDays(selectedDate, i));
        }
      } else {
        // Normal case: keep the selected day in the middle
        for (let i = -2; i <= 2; i++) {
          days.push(addDays(selectedDate, i));
        }
      }

      // Update visibleDays only after animation is complete
      if (animationComplete) {
        setVisibleDays(days);
      }
    };

    updateVisibleDays();
  }, [selectedDate, animationComplete]);

  // Function to handle date selection
  const handleDateChange = (date) => {
    setAnimationComplete(false);
    setSelectedDate(date);
  };

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  // Define animation variants
  const variants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -50 : 50,
      scale: 0.9,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction === "left" ? 50 : -50,
      scale: 0.9,
    }),
  };

  return (
    <div className="flex justify-center items-center pt-2 ">
      <div className="flex bg-white p-2  items-center justify-between rounded-lg shadow-md w-full relative">
        <LayoutGroup>
          <AnimatePresence>
            {visibleDays.map((date, index) => {
              const isSelected =
                format(date, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd");
              const direction = index < 2 ? "left" : "right";

              return (
                <motion.div
                  key={format(date, "yyyy-MM-dd")}
                  className={`flex flex-col items-center justify-center w-16 h-16 cursor-pointer text-zinc-500 rounded-xl relative shrink-0 ${
                    isSelected && "text-white"
                  }`}
                  onClick={() => handleDateChange(date)}
                  custom={direction}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.6,
                  }}
                >
                  <div
                    className={cn("z-10 text-sm", {
                      "text-white": isSelected,
                    })}
                  >
                    {format(date, "EEE")}
                  </div>
                  <div
                    className={cn("z-10 text-lg font-vazir font-bold", {
                      "text-white": isSelected,
                    })}
                  >
                    {toEnglishNumbers(toLocalDateShort(date)).split("/")[2]}
                  </div>
                  {isSelected && (
                    <motion.div
                      className="absolute bg-sky-200 top-0 left-0 w-16 h-16 rounded-xl shrink-0"
                      layoutId="blue-square"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        duration: 0.5,
                      }}
                      onAnimationComplete={handleAnimationComplete}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default CustomDatePicker;
