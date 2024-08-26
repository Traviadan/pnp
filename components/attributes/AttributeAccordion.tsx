import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { updateAttributeAction } from "@/actions/character-actions";
import { AttributeForm } from "./AttributeForm";
import { AttributeFormType } from "@/lib/schemas";
import { AccordionContainer } from '@/components/global/AccordionContainer';


export function AttributeAccordion({attributes}: {attributes: AttributeFormType[]})
{
  return (
    <AccordionContainer className="w-1/2">
      {attributes.map((row) => {
        return (
          <AccordionItem key={row.id} value={'item-' + row.id}>
            <AccordionTrigger>
              <span className="cursor-pointer">{row.name}: {row.value}</span>
            </AccordionTrigger>
            <AccordionContent>
              <AttributeForm attribute={row} action={updateAttributeAction} />
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </AccordionContainer>
  )
}
