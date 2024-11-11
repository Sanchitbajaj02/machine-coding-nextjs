"use client"
import { useEffect, useState } from "react";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import { TableData } from "@/types/analytics";
import { LineChart } from "@/components/analytics/LineChart";
import { BarChart } from "@/components/analytics/BarChart";
import { SearchBar } from "@/components/analytics/Searchbar";
import { searchUser } from "./action";

export default function AnalyticsPage() {
  const [tableData, setTableData] = useState<TableData[]>([])

  useEffect(() => {
    fetch('https://dummyjson.com/users').then((resp) => resp.json()).then((data) => {
      setTableData(data?.users)
    })
  }, [])

  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Analytics Board</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 my-8">
        <LineChart tableData={tableData} />
        <BarChart tableData={tableData} />
      </div>

      <div className="space-y-4">
        <SearchBar setTableData={setTableData} searchUser={searchUser} />
        <AnalyticsDashboard tableData={tableData} />
      </div>
    </div>
  );
}
