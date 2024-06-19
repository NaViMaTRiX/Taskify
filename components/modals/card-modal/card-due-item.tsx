"use client"

import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
import { useState } from "react";
import CalendarModel from "@/components/calendar/calendar-model";
        

export const CardDueItem = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); // из БД доставать надо

  const handleVisibility = (visible: boolean) => {
    setIsVisible(!visible);
  }

  const handleCompleted = (completed: boolean) => {
    setIsCompleted(!completed);
  }

  return (
    <div className="ml-2">
      <input className="mr-2" type="checkbox" onClick={() => { handleCompleted(isCompleted) }}></input>
      {/* <Button
        className="bg-neutral-200 hover:bg-neutral-300 text-black font-medium rounded rounded-md px-2 py-0 h-8"
        onClick={() => handleVisibility(isVisible)}>
        <span>28 апреля 2024</span>
        <span>
          <ChevronDown className="h-5 w-5" />
        </span>
        
      </Button> */}
      <CalendarModel />
      {isCompleted ?
          <span className="ml-2 bg-green-400 border border-green-400 rounded-md px-2 text-xs">Выполнено</span> :
          ""}
    </div>
  );
}

