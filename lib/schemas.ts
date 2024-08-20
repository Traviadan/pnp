import { Prisma } from '@prisma/client';
import { z, ZodSchema } from 'zod';

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

export const Character = z.object({
  id: z.coerce.number().int(),
  name: z.string().min(1).max(100),
  finished: z.coerce.boolean(),
  metatype: Metatype,
  metatypeId: z.string(),
  user: User,
  userId: z.coerce.number().int(),
});
export type Character = z.infer<typeof Character>;

export const GameAttribute = z.object({
  id: z.string().min(2).max(20),
  shortname: z.string().min(1).max(3),
  isDefault: z.boolean(),
});

export const Attribute = z.object({
  id: z.number().int(),
  name: z.string().min(2).max(20),
  character: Character,
  characterId: z.number().int(),
  gameAttribute: GameAttribute,
  gameAttributeId: z.string(),
  value: z.number().int(),
  valueMax: z.number().int(),
});

export const jsonGameSkill = z.object({
  name: z.string().min(1).max(20),
  attribute: z.string().min(1).max(20),
  group: z.string().min(1).max(20).optional(),
  attributeId: z.number().int(),
  groupId: z.number().int().optional(),
  default: z.boolean(),
});

export const GameSkill = z.object({
  id: z.string().min(1).max(20),
  attributeId: z.string(),
  groupId: z.string().nullish(),
  default: z.boolean(),
});

export const GameSkillGroup = z.object({
  id: z.string().min(2).max(20),
  description: z.string().min(2).max(100).nullish(),
});

export const Skill = z.object({
  id: z.number().int(),
  skill: GameSkill,
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
