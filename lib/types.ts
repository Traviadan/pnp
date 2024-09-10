import { z } from "zod"

export type BaseDataType = {
  id?: number
  name?: string
  description?: string
}

export type BaseFormType = BaseDataType & z.ZodTypeAny

export type CloseFunction = () => void


export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export type formActionFunction = (
  prevState: any,
  rawData: any
) => Promise<{ message: string }>;

export type deleteFromListHandler = (
  entryId: number,
  listId?: number,
) => Promise<{ message: string }>;

export type updateEntryHandler = (
  {entryId, ...props}: {entryId: number, props: any}
) => Promise<{ message: string }>;

export type CartItem = {
  productId: string;
  image: string;
  title: string;
  price: string;
  amount: number;
  company: string;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};

export type VoidFunction = () => void;

export type FormActionFunction = (
  prevState: any,
  rawData: unknown
) => Promise<{ message: string }>;
