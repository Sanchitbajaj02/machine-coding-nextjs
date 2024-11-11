"use client"
import React from 'react'
import {Card, CardHeader, CardTitle} from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"
import { TableData } from '@/types/analytics'

ChartJS.register(
  CategoryScale,
  LinearScale, PointElement, LineElement, Title, Tooltip, Legend
)

const labels = [
  1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030
]

export const LineChart = ({ tableData }: { tableData: TableData[] }) => {

  const filteredData = tableData.map((rows) => rows.age)

  return (
    <Card className='p-2'>
      <CardHeader>
        <CardTitle>User's Age Spectrum</CardTitle>
      </CardHeader>
      <Line data={{
        labels: labels,
        datasets: [
          {
            label: "Age Spectrum",
            data: filteredData,
            borderColor: "rgba(75, 192, 192, 1)"
          },
        ]
      }} />
    </Card>
  )
}
