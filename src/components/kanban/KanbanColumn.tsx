"use client";

import { Card } from "@/components/ui/card";
import { Task, Column } from "@/types/kanban";
import { Draggable } from "@hello-pangea/dnd";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { KanbanColumnProps } from "@/types/kanban";


export default function KanbanColumn({ column, tasks, provided }: KanbanColumnProps) {
  return (
    <div
      className={`flex flex-col h-full rounded-lg ${column.color} p-4`}
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{column.title}</h3>
        <span className="bg-background/50 text-foreground px-2 py-1 rounded-full text-sm">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <Card
                className="p-4 bg-background shadow-sm"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <h4 className="font-medium mb-2">{task.title}</h4>
                {task.description && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {task.description}
                  </p>
                )}
                {task.dueDate && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {dayjs(new Date(task.dueDate)).format("MMMM D, YYYY")}
                  </div>
                )}
              </Card>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    </div>
  );
}