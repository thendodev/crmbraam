"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import CellActions from "./cell-actions"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumnProps = {
  id: string
  name : string,
  color : string,
  size : string,
  isFeatured : boolean,
  isArchived : boolean, 
  createdAt:string
}

export const columns: ColumnDef<ProductColumnProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell : ({row}) =>(
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border" 
        style={{backgroundColor : row.original.color}}></div>
      </div>
    )
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
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
