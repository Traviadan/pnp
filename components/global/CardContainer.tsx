import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils';

type CardParams = {
  children: React.ReactNode
  title: string
  description?: string
  footer?: string
  cardClass?: string
  headerClass?: string
  titleClass?: string
  contentClass?: string
  footerClass?: string
};

export function CardContainer(params: CardParams) {
  const {
    children, 
    title, 
    description, 
    footer, 
    cardClass, headerClass, titleClass, contentClass, footerClass } = params;

  return (
    <Card className={cn('transform group-hover:shadow-xl transition-shadow duration-500', cardClass)}>
      <CardHeader className={cn('', headerClass)}>
        <CardTitle className={cn('', titleClass)}>
          {title}
        </CardTitle>
        <CardDescription className={cn('', titleClass)}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className={cn('p-4', contentClass)}>
        {children}
      </CardContent>
      <CardFooter className={cn('', footerClass)}>
        {footer}
      </CardFooter>
    </Card>
  );
}
