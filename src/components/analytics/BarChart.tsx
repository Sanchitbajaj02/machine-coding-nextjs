"use client"
import React from 'react'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { TableData } from '@/types/analytics'

ChartJS.register(
  CategoryScale,
  LinearScale, BarElement, Title, Tooltip, Legend
)

const bloodgroups: { [key: string]: number } = {
  'A+': 0,
  'A-': 0,
  'B+': 0,
  'B-': 0,
  'AB+': 0,
  'AB-': 0,
  'O+': 0,
  'O-': 0
}

export const BarChart = ({ tableData }: { tableData: TableData[] }) => {

  tableData.forEach((row: TableData) => {
    if (bloodgroups.hasOwnProperty(row.bloodGroup)) {
      bloodgroups[row.bloodGroup]++
    } else {
      bloodgroups[row.bloodGroup] = 1
    }
  })

  return (
    <Card className='p-2'>
      <CardHeader>
        <CardTitle>User's Blood Group Graph</CardTitle>
      </CardHeader>
      <Bar data={{
        labels: Object.keys(bloodgroups),
        datasets: [
          {
            label: "Age Spectrum",
            data: Object.values(bloodgroups),
            backgroundColor: [
              'rgba(255, 99, 132, 0.3)',
              'rgba(255, 159, 64, 0.3)',
              'rgba(255, 205, 86, 0.3)',
              'rgba(75, 192, 192, 0.3)',
              'rgba(54, 162, 235, 0.3)',
              'rgba(153, 102, 255, 0.3)',
              'rgba(201, 203, 207, 0.3)'
            ],
          },
        ]
      }} />
    </Card>
  )
}
