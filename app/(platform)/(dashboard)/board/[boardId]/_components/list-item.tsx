"use client";

import { ElementRef, useRef, useState, useEffect } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";

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

  // Состояние показа выполненных карточек
  const [showChecked, setShowChecked] = useState(true);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => setIsEditing(false);

  const toggleShowChecked = () => setShowChecked((prev) => !prev);

  // Фильтруем видимые карточки
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
            className="dark:bg-slate-800 min-w-256 rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            {/* Заголовок списка + кнопка архивирования */}
            <ListHeader
              onAddCard={enableEditing}
              data={data}
              showChecked={showChecked}
              toggleShowChecked={toggleShowChecked}
            />

            {/* Дропаем карточки */}
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <AnimatePresence>
                  {visibleCards.length > 0 && (
                    <motion.ol
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mx-1 px-1 py-0.5 flex flex-col gap-y-2 overflow-hidden"
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
                    </motion.ol>
                  )}
                </AnimatePresence>
              )}
            </Droppable>

            {/* Форма для добавления новой карточки */}
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
