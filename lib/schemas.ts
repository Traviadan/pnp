import { z, ZodSchema } from 'zod';

export const characterSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  
});

export const gameAttributeSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(20, {
      message: 'name must be less than 20 characters.',
    }),
  shortname: z
    .string()
    .min(1, {
      message: 'name must be at least 1 character.',
    })
    .max(3, {
      message: 'name must be less than 3 characters.',
    }),
  isdefault: z.boolean({
    required_error: "isdefault is required",
    invalid_type_error: "isdefault must be a boolean",
    })
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }
  return result.data;
}
