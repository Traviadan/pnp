"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import type { CharacterFormType } from "@/lib/schemas";
import { CharacterFormSchema } from "@/lib/schemas";
import sr_metatypes from '../../lib/sr_metatypes.json';
import { formActionFunction, CloseFunction } from "@/lib/types";

const initialState = {message: '',};

export function CharacterForm(
  { action,
    closeDialog,
    character}: {
      action: formActionFunction,
      closeDialog?: CloseFunction,
      character?: CharacterFormType
    })
  {
  const initialData = CharacterFormSchema.parse(character)
  const form = useForm<CharacterFormType>({ resolver: zodResolver(CharacterFormSchema),
    defaultValues: initialData
   })
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

  function onSubmit(data: CharacterFormType) {
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
                          ? sr_metatypes.metatypes.find(
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
                        {sr_metatypes.metatypes.map((row: { id: string, name: string}) => (
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
}
