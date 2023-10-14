"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import CellActions from "./cell-actions"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumnProps = {
  id: string
  phone: string
  address : string
  isPaid : boolean
  totalPrice : string
  products : string
  createdAt:string
}

export const columns: ColumnDef<OrderColumnProps>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey : "phone",
    header : "Phone"
  },
  {
    accessorKey : "totalPrice",
    header : "Total Price"
  },
  {
    accessorKey : "isPaid",
    header : "Paid"
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
