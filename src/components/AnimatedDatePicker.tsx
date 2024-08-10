//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
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
        (date) => format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
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

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex space-x-2 bg-white p-4 rounded-lg shadow-md w-full relative">
        <LayoutGroup>
          <AnimatePresence>
            {visibleDays.map((date, index) => {
              const isSelected =
                format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

              return (
                <motion.div
                  key={format(date, "yyyy-MM-dd")}
                  className={`flex flex-col items-center justify-center w-16 h-16 cursor-pointer rounded-xl relative`}
                  onClick={() => handleDateChange(date)}
                  initial={{ opacity: 0, x: index < 2 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: index < 2 ? 50 : -50 }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                >
                  <div className="z-10 text-sm">{format(date, "EEE")}</div>
                  <div className="z-10 text-lg">{format(date, "d")}</div>
                  {isSelected && (
                    <motion.div
                      className="absolute bg-blue-200 top-0 left-0 w-16 h-16 rounded-xl"
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
