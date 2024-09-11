'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler, FieldValues, DefaultValues } from "react-hook-form"
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { FormActionFunction, VoidFunction } from "@/lib/types";
import { parseData } from "@/lib/schemas";
import { ZodSchema, ZodTypeAny } from "zod";

const initialState = {message: '',};

interface FormProps <T> {
  schema: T
  data: any
  closeDialog?: VoidFunction
}

export function FormController<T extends ZodTypeAny>(params: FormProps<T>) {
  const {schema, data, closeDialog} = params
  const initialData: DefaultValues<FieldValues> = parseData(data, schema)
  
  const form = useForm({ resolver: zodResolver(schema),
    defaultValues: initialData,
    mode: 'onSubmit', reValidateMode: 'onBlur'
  })
  const {
    handleSubmit,
    reset,
    control,
    formState,
    formState: {isSubmitted, isValid} } = form

  const [state, setState] = useState(initialState);
  const [formData, setData] = useState(initialData);

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message })
      setState(initialState)
      if (closeDialog) {
        closeDialog()
      }
    }
  }, [state, formState, reset, formData, closeDialog])

  const onSubmit = (data: DefaultValues<FieldValues>) => {
    setData(data)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <>
        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={control}
        name="value"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Neuer Wert</FormLabel>
            <FormControl>
              <Input type="number" max={formData.valueMax} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </>
      <Button type="submit">Submit</Button>
    </form>
  </Form>
)
}