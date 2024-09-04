"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
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
import { BaseSchema, BaseSchemaType, parseData } from "@/lib/schemas";

const initialState = {message: '',};

interface FormProps {
  data: unknown
  action: FormActionFunction
  closeDialog?: VoidFunction
}

export function FormNumberValue(params: FormProps) {
  const {data, action, closeDialog} = params
  const initialData = parseData(data, BaseSchema)
  
  const form = useForm<BaseSchemaType>({ resolver: zodResolver(BaseSchema),
    defaultValues: initialData,
    mode: 'onSubmit', reValidateMode: 'onSubmit'
  })
  const {
    handleSubmit,
    control,
    formState,
    reset,
    setError,
    formState: {isSubmitted, isValid} } = form

  const [state, setState] = useState(initialState);
  const [formData, setData] = useState(initialData);

  useEffect(() => {
    const updateAttribute = async () => {
      setState(await action(state, formData))
      reset(undefined, {keepValues: true})
    }
    if (formState.isSubmitted && formState.isValid) {
      updateAttribute()
    }
    if (state.message) {
      toast({ description: state.message })
      setState(initialState)
      if (closeDialog) {
        closeDialog()
      }
    }
  }, [setError, state, formState, reset, action, formData, closeDialog])

  const onSubmit: SubmitHandler<BaseSchemaType> = (data) => {
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