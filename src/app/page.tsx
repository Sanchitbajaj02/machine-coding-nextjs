import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-screen-lg mx-auto py-8">
      <h1 className="text-4xl font-bold text-center">Master ji Nextjs Assessment</h1>

      <div className="mt-16 space-y-8">
        <div>
          <h2 className="text-2xl font-medium">Assessment 1: Weather and News Dashboard</h2>
          <Link href="/dashboard/weather-news" className="text-blue-800 text-lg">Assignment Link</Link>
        </div>

        <div>
          <h2 className="text-2xl font-medium">Assessment 2: Interactive Kanban Board</h2>
          <Link href="/dashboard/kanban" className="text-blue-800 text-lg">Assignment Link</Link>

        </div>
        <div>
          <h2 className="text-2xl font-medium">Assessment 3: Analytics Dashboard</h2>
          <Link href="/dashboard/analytics" className="text-blue-800 text-lg">Assignment Link</Link>

        </div>
      </div>
    </main>
  );
}
