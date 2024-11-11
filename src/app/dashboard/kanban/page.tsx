import KanbanBoard from "@/components/kanban/KanbanBoard";

export default function KanbanPage() {
  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Kanban Board</h1>
      </div>
      <KanbanBoard />
    </div>
  );
}
