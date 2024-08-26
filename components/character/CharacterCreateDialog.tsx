'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createCharacterAction } from "@/actions/character-actions"
import { useEffect, useState } from 'react';
import { CharacterForm } from "./CharacterForm"

export function CharacterCreateDialog()
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
        <Button variant="default">Neu</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Character erstellen</DialogTitle>
          <DialogDescription>
            Mit Speichern abschliessen.
          </DialogDescription>
        </DialogHeader>
          <CharacterForm closeDialog={closeDialog} action={createCharacterAction} />
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
