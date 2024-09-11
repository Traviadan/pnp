'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFormContext } from "react-hook-form"


interface FormFieldNumberInputProps {
  fieldName: string
  fieldLabel?: string
  fieldData: number
  fieldMax?: number
}
interface FormFieldTextInputProps {
  fieldName: string
  fieldLabel?: string
  fieldData: string
  fieldHidden?: boolean
}
interface FormFieldSelectProps {
  fieldName: string
  fieldLabel?: string
  fieldData: string
  selectData: {id: string, name: string}[]
  formDescription?: string
}

export function FormFieldNumberInput(params: FormFieldNumberInputProps) {
  const { fieldName, fieldLabel = '', fieldData, fieldMax } = params
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldLabel}</FormLabel>
          <FormControl>
            <Input type="number" max={fieldMax} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function FormFieldTextInput(params: FormFieldTextInputProps) {
  const { fieldName, fieldLabel = '', fieldData, fieldHidden = false } = params
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem hidden={fieldHidden}>
          <FormLabel>{fieldLabel}</FormLabel>
          <FormControl>
            <Input type="text" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function FormFieldSelect(params: FormFieldSelectProps) {
  const { fieldName, fieldLabel = '', fieldData, selectData, formDescription = '' } = params
  const { control, setValue } = useFormContext()

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{fieldLabel}</FormLabel>
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
                      ? selectData.find(
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
                  <CommandEmpty>Keine Daten definiert!</CommandEmpty>
                  <CommandGroup>
                    {selectData.map((row) => (
                      <CommandItem
                        value={row.name}
                        key={row.id}
                        onSelect={() => {
                          setValue(fieldName, row.id)
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
            {formDescription}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}