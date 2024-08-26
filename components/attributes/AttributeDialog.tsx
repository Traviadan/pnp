'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { updateAttributeAction } from "@/actions/character-actions";
import { useEffect, useState } from 'react';
import { AttributeForm } from "./AttributeForm";
import { AttributeFormType } from "@/lib/schemas";

export function AttributeDialog({attribute}: {attribute: AttributeFormType})
{
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false);
  }, []);

  const closeDialog = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer">{attribute.name}: {attribute.value}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Attributswert ändern</DialogTitle>
          <DialogDescription>
            Mit Speichern abschliessen.
          </DialogDescription>
        </DialogHeader>
          <AttributeForm attribute={attribute} closeDialog={closeDialog} action={updateAttributeAction} />
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
