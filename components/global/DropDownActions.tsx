'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LuTrash2, LuPenSquare } from 'react-icons/lu';
import { updateEntryHandler } from "@/lib/types";

function DropdownActions({entryId, action, ...props}: {entryId: number, action:updateEntryHandler, props: any}) {
  function clickEditHandler() {
    action({entryId, props});
  }

  function clickDeleteHandler() {
    //action({entryId, props});
  }

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem onClick={clickEditHandler}>
        <LuPenSquare /> Ändern
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={clickDeleteHandler}>
        <LuTrash2 /> Löschen
      </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownActions;
