export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
}

export interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  provided: any;
}