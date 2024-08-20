"use client"

import { cn } from '@/lib/utils';
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronsUpDown, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleContainer({
  children,
  className,
  title = 'Stückliste'
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className={cn("flex items-center justify-between space-x-4 px-4", className)}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            {title}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <ScrollArea className="h-96 w-full rounded-md border">
          {children}
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  )
}
