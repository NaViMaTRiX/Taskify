"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";
import { useEffect, useState } from "react";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();
  const localStorageKey = `card-checked-${data.id}`;

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (stored === "true") setChecked(true);
  }, [localStorageKey]);

  const handleCheckChange = (value: boolean) => {
    setChecked(value);
    localStorage.setItem(localStorageKey, value.toString());
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="group relative flex items-center dark:bg-slate-600 dark:hover:border-white border-2 border-transparent hover:border-black py-2 pl-3 pr-3 text-sm bg-white rounded-md shadow-sm w-full transition-all duration-200"
        >
          {/* Чекбокс — переключаем поведение через состояние checked */}
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => handleCheckChange(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            aria-label="mark card"
            className={
              `peer w-5 h-5 cursor-pointer rounded-md border-2 transition-all duration-200 ` +
              (checked
                // checked: в потоке — занимает место (static/relative), видимый
                ? "static relative opacity-100 z-10 mr-2 accent-green-600 border-green-500"
                // unchecked: абсолютный, не занимает место; при hover контейнера становится видимым (но остаётся абсолютным)
                : "absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-20 bg-white border-gray-300")
            }
          />

          {/* Текст: при hover (и unchecked) съезжает через translate; при checked — без translate (чекбокс в потоке уже отодвинул текст) */}
          <span
            onClick={() => cardModal.onOpen(data.id)}
            className={
              "flex-1 transition-all duration-200 break-words overflow-hidden cursor-pointer " +
              (checked
                ? "line-through text-gray-400" // checked -> оформление и без translate
                : "group-hover:translate-x-7")
            }
          >
            {data.title}
          </span>
        </div>
      )}
    </Draggable>
  );
};
