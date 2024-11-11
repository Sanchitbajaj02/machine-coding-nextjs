import React from "react";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import { TableData } from "@/types/analytics";
import { LineChart } from "@/components/analytics/LineChart";
import { BarChart } from "@/components/analytics/BarChart";

export default async function AnalyticsPage() {

  const apiResponse = await fetch('https://dummyjson.com/users')

  if (!apiResponse.ok) {
    return (
      <>
        <h1>No data found</h1>
      </>
    )
  }

  let tableData: { users: TableData[] } = await apiResponse.json()

  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Analytics Board</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 my-8">
        <LineChart tableData={tableData?.users} />
        <BarChart tableData={tableData?.users} />
      </div>

      {/* {JSON.stringify(dummyData)} */}
      <AnalyticsDashboard tableData={tableData?.users} />
    </div>
  );
}
