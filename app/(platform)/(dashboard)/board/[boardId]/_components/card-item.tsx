import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";
import { useEffect, useState } from "react";

interface CardItemProps {
  data: Card;
  index: number;
  showChecked: boolean;
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
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="group relative flex items-center dark:bg-slate-600 dark:hover:border-white border-2 border-transparent py-2 pl-3 pr-3 text-sm bg-white dark:bg-slate-700 rounded-md shadow-sm w-full overflow-hidden"
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => handleCheckChange(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            aria-label="mark card"
            className={`peer w-5 h-5 cursor-pointer rounded-md border-2 transition-all duration-200 ${checked
              ? "static relative opacity-100 z-10 mr-2 accent-green-600 border-green-500"
              : "absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-20 bg-white border-gray-300"
              }`}
          />
          <span
            onClick={() => cardModal.onOpen(data.id)}
            className={`flex-1 transition-all duration-200 break-words overflow-hidden cursor-pointer ${checked ? "text-gray-400" : "group-hover:translate-x-7 text-gray-200"
              }`}
          >
            {data.title}
          </span>
        </div>
      )}
    </Draggable>
  );
};
