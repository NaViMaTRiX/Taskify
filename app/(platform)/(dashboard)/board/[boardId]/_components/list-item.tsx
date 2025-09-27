"use client";

import { ElementRef, useRef, useState, useEffect } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";
import { ListHeader } from "./list-header";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Состояние архивации списка с localStorage
  const storageKey = `list-archive-${data.id}`;
  const [showChecked, setShowChecked] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) setShowChecked(stored === "true");
  }, [storageKey]);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => setIsEditing(false);

  const toggleShowChecked = () => {
    setShowChecked((prev) => {
      localStorage.setItem(storageKey, (!prev).toString());
      return !prev;
    });
  };

  const visibleCards = data.cards.filter(
    (card) => showChecked || localStorage.getItem(`card-checked-${card.id}`) !== "true"
  );

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="dark:bg-slate-800 min-w-256 rounded-md bg-[#f1f2f4] dark:bg-slate-800 shadow-md pb-2"
          >
            <ListHeader
              onAddCard={enableEditing}
              data={data}
              showChecked={showChecked}
              toggleShowChecked={toggleShowChecked}
            />

            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mx-1 px-1 py-0.5 flex flex-col gap-y-2"
                >
                  {visibleCards.map((card, index) => (
                    <CardItem
                      key={card.id}
                      index={index}
                      data={card}
                      showChecked={showChecked}
                    />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>

            <CardForm
              listId={data.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
