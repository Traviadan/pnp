import {
  Accordion,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';

export function AccordionContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
})
{
  return (
    <Accordion type="single" collapsible className={cn('mx-auto max-w-6xl xl:max-w-7xl px-8', className)}>
      {children}
    </Accordion>
  )
}
