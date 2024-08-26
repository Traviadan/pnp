"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { AttributeFormSchema } from "@/lib/schemas";
import type { AttributeFormType } from "@/lib/schemas";
import { formActionFunction, CloseFunction } from "@/lib/types";

const initialState = {message: '',};

export function AttributeForm(
  { attribute,
    action,
    closeDialog}: {attribute: AttributeFormType, action: formActionFunction, closeDialog?: CloseFunction}
  )
  {
    const initialData = AttributeFormSchema.parse(attribute)
    const form = useForm<AttributeFormType>({ resolver: zodResolver(AttributeFormSchema), defaultValues: initialData })
    const { formState, reset, formState: {isSubmitted, isValid} } = form
    const [state, setState] = useState(initialState);
    const [formData, setData] = useState(initialData);

    useEffect(() => {

      if (state.message) {
        toast({ description: state.message })
        setState(initialState)
      }
      const sendFormData = async () => {
        setState(await action(state, formData))
        reset(undefined, {keepValues: true})
      }
      if (formState.isSubmitted && formState.isValid) {
        sendFormData()
      }
    }, [action, state, formState, formData, reset]);

    function onSubmit(data: AttributeFormType) {
      /*
      toast({
        title: "Folgendes wurde übermittelt:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      */
      setData(data)
      if (closeDialog) closeDialog()
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <>
          <FormField
            control={form.control}
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
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input {...field} />
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
