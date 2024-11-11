"use client";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import KanbanColumn from "./KanbanColumn";
import { AddTaskDialog } from "./AddTaskDialog";
import { Task, Column } from "@/types/kanban";

const defaultColumns: Column[] = [
  { id: "todo", title: "To Do", color: "bg-gray-100" },
  { id: "in-progress", title: "In Progress", color: "bg-gray-100" },
  { id: "completed", title: "Completed", color: "bg-gray-100" },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("kanban-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const columnTasks = tasks.filter(task => task.columnId === source.droppableId);
      const reorderedTasks = Array.from(columnTasks);
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);

      const updatedTasks = tasks.filter(task => task.columnId !== source.droppableId)
        .concat(reorderedTasks);
      
      setTasks(updatedTasks);
    } else {
      // Move between columns
      const sourceTasks = tasks.filter(task => task.columnId === source.droppableId);
      const destTasks = tasks.filter(task => task.columnId === destination.droppableId);
      const taskToMove = sourceTasks[source.index];

      const updatedTasks = tasks.filter(task => 
        task.id !== taskToMove.id
      ).concat({
        ...taskToMove,
        columnId: destination.droppableId
      });

      setTasks(updatedTasks);
    }
  };

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button onClick={() => setIsAddTaskOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)] overflow-hidden">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col h-full">
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <KanbanColumn
                    column={column}
                    tasks={tasks.filter((task) => task.columnId === column.id)}
                    provided={provided}
                  />
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddTaskDialog
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        onAddTask={addTask}
      />
    </div>
  );
}