import { z, ZodSchema } from 'zod';
import { BaseFormType } from './types';

export const BaseSchema = z.object( { 
  id: z.coerce.number().int().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  value: z.coerce.number().int().optional(),
  valueMax: z.coerce.number().int().optional(),
})
export type BaseSchemaType = z.infer<typeof BaseSchema>;

export const Group = z.object( {
  id: z.number().int(),
  name: z.string().min(1).max(100),
} );
export type Group = z.infer<typeof Group>;
export const GroupCreate = Group.pick({ name: true });

export const User = z.object( { 
  id: z.number().int(),
  name: z.string().min(1).max(100),
  email: z.string().email().nullish(),
  password: z.string().min(8),
} );
export type User = z.infer<typeof User>;
export const UserCreate = User.pick({ name: true, email: true, password: true});
export type UserCreate = z.infer<typeof UserCreate>;
export const UserForm = User.default(
  { id: 0, name: 'tbd', email: undefined, password: '12345678'}
)
export const Session = z.object( {
  id: z.string(),
  userId: z.number().int(),
  expiresAt: z.date(),
  user: User,
} );

export const Metatype = z.object( { 
  id: z.string().min(1).max(100),
} );
export type Metatype = z.infer<typeof Metatype>;
export const MetatypeForm = Metatype.default(
  { id: 'tbd' }
)

export const Character = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(100),
  finished: z.coerce.boolean(),
  metatypeId: z.string(),
  user: User.nullish(),
  userId: z.coerce.number().int(),

})
export type CharacterType = z.infer<typeof Character>;

export const CharacterFormSchema = Character.default(
  { id: 0,
    name: 'John Doe',
    finished: false,
    metatypeId: '',
    user: UserForm.parse(undefined),
    userId: 0}
)
export type CharacterFormType = z.infer<typeof CharacterFormSchema>

export const Attribute = z.object({
  id: z.coerce.number().int(),
  name: z.string().max(20),
  character: Character,
  characterId: z.number().int(),
  value: z.coerce.number().int(),
  valueMax: z.coerce.number().int(),
});
export type Attribute = z.infer<typeof Attribute>
export const AttributeFormSchema = Attribute.partial()
export type AttributeFormSchemaType = BaseFormType & z.infer<typeof AttributeFormSchema>

export const Skill = z.object({
  id: z.number().int(),
  skillId: z.string(),
  character: Character,
  characterId: z.number().int(),
  value: z.number().int(),
  valueMax: z.number().int(),
});

export const CharacterNote = z.object({
  id: z.number().int(),
  noteText: z.string().min(1).max(200),
  character: Character,
  characterId: z.number().int(),
});

export const Favorite = z.object( {
  id: z.coerce.number().int(),
  user: User,
  userId: z.coerce.number().int(),
  character: Character.omit({ user: true }),
  characterId: z.coerce.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
} );
export const FavoriteWithoutUser = Favorite.omit({
  user: true
});
export type Favorite = z.infer<typeof Favorite>;
export type FavoriteWithoutUser = z.infer<typeof FavoriteWithoutUser>;

export const CharacterWithRelations = Character.extend({
  notes: CharacterNote.array().nullish(),
  attributes: Attribute.array().nullish(),
  skills: Skill.array().nullish(),
  favorite: Favorite.array().nullish(),
})

export const idSchema = z.coerce.number().int();

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

export function inferSchema<T extends z.ZodTypeAny>(schema: T) {
  return schema;
}

export function parseData<T extends z.ZodTypeAny>(data: unknown, schema: T) {
  return schema.parse(data) as z.infer<T>;
}