"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm, FieldValues, DefaultValues } from "react-hook-form"
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import type { CharacterType, CharacterFormType } from "@/lib/schemas";
import { Character, CharacterFormSchema } from "@/lib/schemas";
import { metatypes } from "@/lib/data";
import { formActionFunction, CloseFunction } from "@/lib/types";
import { FormFieldTextInput, FormFieldNumberInput, FormFieldSelect } from "../form/FormFieldContainer"

const initialState = {message: '',}

export const schema = Character.omit({user: true, userId: true}).extend(
  {
    image: z.instanceof(File).refine(
      (file) => file.size < 7000000, {message: 'Your image must be less than 7MB.',}
    ).optional()
  }
).default(
  { 
    id: 0,
    name: 'John Doe',
    finished: false,
    metatypeId: '',
    image: undefined,
  }
)

export function CharacterForm(
  { action,
    closeDialog,
    character}: {
      action: formActionFunction,
      closeDialog?: CloseFunction,
      character?: CharacterFormType
    })
  {
  const initialData: DefaultValues<FieldValues> = schema.parse(character)

  const form = useForm({ resolver: zodResolver(schema),
    defaultValues: initialData, mode: 'onSubmit', reValidateMode: 'onBlur'
   })
  const { formState, reset, handleSubmit, formState: {isSubmitted, isValid} } = form

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
      //sendFormData()
    }
  }, [action, state, formState, formData, reset]);

  const onSubmit = (data: DefaultValues<FieldValues>) => {
    toast({
      title: "Folgendes wurde übermittelt:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    //setData(data)
    if (closeDialog) closeDialog()
  }


  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormFieldTextInput
      fieldName="id"
      fieldData={initialData.id.toString()}
      fieldHidden
      />
      <FormFieldTextInput
      fieldName="name"
      fieldData={initialData.name}
      fieldLabel="Name"
      />
      <FormFieldSelect
      fieldName="metatypeId"
      fieldData={initialData.metatypeId}
      selectData={metatypes}
      fieldLabel="Metatype"
      formDescription="Einen Metatyp auswählen"
      />
      <Button type="submit">Speichern</Button>
      </form>
    </Form>
  )
/*
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Picture"
                  type="file"
                  accept="image/*, application/pdf"
                  onChange={(event) => {
                    onChange(event.target.files && event.target.files[0])
                    if (event.target.files && event.target.files[0]) {
                      onImageChange(event.target.files[0])
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name [John Doe]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metatypeId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Metatyp</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                        {field.value
                          ? metatypes.find(
                              (row) => row.id === field.value
                            )?.name
                          : "Metatyp wählen"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Durchsuchen..." />
                    <CommandList>
                      <CommandEmpty>Keine Metatypen definiert!</CommandEmpty>
                      <CommandGroup>
                        {metatypes.map((row: { id: string, name: string}) => (
                          <CommandItem
                            value={row.name}
                            key={row.id}
                            onSelect={() => {
                              form.setValue("metatypeId", row.id)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                row.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {row.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Metatype auswählen
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
*/
}
