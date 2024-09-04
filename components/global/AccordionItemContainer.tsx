import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import { BaseSchemaType } from "@/lib/schemas";
import { attributes } from "@/lib/data";
import assert from "assert";

type AccordionParams = {
  children: React.ReactNode
  accordionItem: BaseSchemaType
  triggerClass?: string
  contentClass?: string
};

export function AccordionItemContainer(params: AccordionParams)
{
  const {
    children,
    accordionItem,
    triggerClass,
    contentClass,
  } = params
  const attributeName = attributes.find((item) => item.id === accordionItem.name)?.name
  assert(attributeName)

  return (
    <AccordionItem value={`item-${accordionItem.id}`}>
      <AccordionTrigger className={cn('', triggerClass)}>
        {attributeName}
      </AccordionTrigger>
      <AccordionContent className={cn('', contentClass)}>
        {children}
      </AccordionContent>
    </AccordionItem>
  )
}
