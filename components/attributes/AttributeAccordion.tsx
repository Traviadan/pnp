import { updateAttributeAction } from "@/actions/character-actions";
import { FormNumberValue } from "../form/FormContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { fetchAttributesOfCharacter } from "@/actions/attribute-actions";
import { attributes } from "@/lib/data";
import assert from "assert";

export async function AttributeAccordion({characterId}: {characterId: string})
{
  const result = await fetchAttributesOfCharacter(parseInt(characterId))
  
  return (
    <Accordion type="single" collapsible className='mx-auto max-w-6xl xl:max-w-7xl px-8 w-1/2'>
    {result.map((row) => {
      const attributeName = attributes.find((item) => item.id === row.name)?.name
      assert(attributeName)
      return (
        <AccordionItem key={row.id} value={`item-${row.id}`}>
          <AccordionTrigger>
            {attributeName}&nbsp;{`${row.value} (${row.valueMax})`}
          </AccordionTrigger>
          <AccordionContent>
            <FormNumberValue action={updateAttributeAction} data={row} />
          </AccordionContent>
        </AccordionItem>
      )}
    )}
    </Accordion>
  )
}
