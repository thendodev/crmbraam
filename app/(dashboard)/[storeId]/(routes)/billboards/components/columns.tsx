"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import CellActions from "./cell-actions"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumnProps = {
  id: string
  label: string
  createdAt:string
}

export const columns: ColumnDef<BillboardColumnProps>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      
  },
  {
    accessorKey : "actions",
    cell: ({row})=><CellActions data={row.original} />
  }

]
