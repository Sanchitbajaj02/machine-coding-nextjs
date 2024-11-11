import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { TableData } from '@/types/analytics'

export default function AnalyticsDashboard({ tableData }: { tableData: TableData[] }) {
  return (
    <Table>
      <TableCaption>A list of users</TableCaption>
      <TableHeader>
        <TableRow className='font-medium'>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone No.</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Birth Date</TableHead>
          <TableHead>Blood group</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData && tableData.length > 0 && tableData.map((row, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.birthDate}</TableCell>
              <TableCell>{row.bloodGroup}</TableCell>
            </TableRow>
          )
        })}

      </TableBody>
    </Table>

  )
}
