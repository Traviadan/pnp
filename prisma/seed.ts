import { Prisma, PrismaClient } from '@prisma/client'
import { hashUserPassword } from '../lib/hash';
import characters from './characters.json';
import game_attributes from './game_attributes.json';
import game_skills from './game_skills.json'
import game_skill_groups from './game_skill_groups.json';
import { z } from 'zod';
import {
  Character, CharacterCreate,
  Metatype, MetatypeCreate,
  jsonGameSkill,
  GameSkill,
  GameSkillGroup,
  idSchema,
  validateWithZodSchema,
  Attribute, 
  GameAttribute,
} from '@/lib/schemas';

const prisma = new PrismaClient()

const connectGameAttribute = (
  name: string,
) => {
  return Prisma.validator<Prisma.GameAttributeCreateNestedOneWithoutSkillsInput>()({
    connect: { name: name }
  });
}

const connectOrCreateAttribute = (
  attribute: z.infer<typeof Attribute>
) => {
  return Prisma.validator<Prisma.AttributeCreateOrConnectWithoutCharacterInput>()({
    where: { name: attribute.name },
    create: {
      name: attribute.name,
      value: attribute.value,
      valueMax: attribute.valueMax,
      gameAttribute: connectGameAttribute( attribute.name )
    }
  });
}

const createAttributeNestedMany = (
  attributes: z.infer<typeof Attribute>[]
) => {
  return Prisma.validator<Prisma.AttributeCreateNestedManyWithoutCharacterInput>() ({
      connectOrCreate: attributes.map( (entry) => { return connectOrCreateAttribute(entry)} )
  });
}

const fetchGameAttributeId = async (attributeName: string) => {
  return prisma.gameAttribute.findFirst({
    where: {
      name: attributeName
    },
    select: {
      id: true
    }
  })
}

const createUser = (
  name: string,
  password: string,
  email?: string,
) => {
  return Prisma.validator<Prisma.UserCreateInput>()({
    name,
    email,
    password
  })
}

const createAttribute = (
  name: string,
  value: number,
  valueMax: number,
  character: z.infer<typeof Character>,
  gameAttribute: z.infer<typeof GameAttribute>,
) => {
  return Prisma.validator<Prisma.AttributeCreateInput>()({
    name,
    value,
    valueMax,
    character: {connectOrCreate: {
      where: { id: character.id },
      create: {
        name: character.name,
        metatype: { connectOrCreate: {where: {name: character.metatype.name}, create: { name: character.metatype.name}}},
        user: {
          connectOrCreate: {
            where: {id: character.user.id},
            create: createUser(character.user.name, character.user.password)}
          },
        finished: character.finished
      }
    }},
    gameAttribute: { connectOrCreate: {
      where: { name: gameAttribute.name },
      create: { name: gameAttribute.name, shortname: gameAttribute.shortname, isDefault: gameAttribute.isdefault }
    }},
  })
}

const createNestedAttributes = (
  name: string,
  value: number,
  valueMax: number,
  gameAttribute: Prisma.GameAttributeCreateNestedOneWithoutAttributesInput,
) => {
  return Prisma.validator<Prisma.AttributeCreateNestedManyWithoutCharacterInput>()({

  })
}

const createCharacter = (
  name: string,
  metatype: Prisma.MetatypeCreateInput,
  user: Prisma.UserCreateInput,
  finished: boolean,
  notes: Prisma.CharacterNoteCreateNestedManyWithoutCharacterInput,
  attributes: Prisma.AttributeCreateNestedManyWithoutCharacterInput,
  skills: Prisma.SkillCreateNestedManyWithoutCharacterInput,
  favorite: Prisma.FavoriteCreateNestedManyWithoutCharacterInput,
) => {
  return Prisma.validator<Prisma.CharacterCreateInput>()({
    name,
    finished,
  })
}

async function main() {
  /*
  var dbAttributes = [];
  for (const item of game_attributes) {
    const createGameAttribute = validateWithZodSchema(GameAttribute, item);
    let result = await prisma.gameAttribute.create({
      data: createGameAttribute
    })
    dbAttributes[result.id] = result;
  }

  var dbSkillGroups = [];
  for (const item of game_skill_groups) {
    const createGameSkillGroup = validateWithZodSchema(GameSkillGroup, item);
    let result = await prisma.gameSkillGroup.create({
      data: createGameSkillGroup
    })
    dbSkillGroups[result.id] = result;
  }

  let gameSkills: z.infer<typeof GameSkill>[] = [];
  for (const item of game_skills) {
    const jGameSkill = validateWithZodSchema(jsonGameSkill, item);
    if (item.group && item.group != "") {
      dbSkillGroups.forEach((element) => {
        if (element.name == item.group) {
          jGameSkill.groupId = element.id;
          return;
        }
      })
    }
    dbAttributes.forEach((element) => {
      if (element.name == item.attribute) {
        jGameSkill.attributeId = element.id;
        return;
      }
    })
    gameSkills.push(validateWithZodSchema(GameSkill, jGameSkill));
  }

  await prisma.gameSkill.createMany({
    data: [
      { name: 'Hallo', default: true, attributeId: 1 },
    ]
  });
  */

  for (const item of characters) {
    const valCharacterFields = validateWithZodSchema( CharacterCreate, item );
    let characterAttributes = Array();
    item.attributes.map(async (entry) => {
      const gaId = await fetchGameAttributeId(entry.name);
      characterAttributes.push(validateWithZodSchema(Attribute, { attributeId: gaId, value: entry.value, valueMax: entry.valueMax}));
    });

    await prisma.character.create({
      data: {
        ...valCharacterFields,
        metatype: {
          create: {
            ...validateWithZodSchema(MetatypeCreate, item.metatype)
          }
        },
        attributes: {
          createMany: {
            data: characterAttributes
          }
        },
        user: {
          connectOrCreate: {
            where: {
              name: "Admin",
            },
            create: {
              name: "Admin",
              email: "thorsten@eggers-bhv.de",
              password: hashUserPassword("password"),
              groups: {
                connectOrCreate: {
                  where: {
                    name: "Administrator"
                  },
                  create: {
                    name: "Administrator"
                  }
                }
              }
            }
          }
        },
      },
    });
    let newCharacter = await prisma.character.create({
      data: {
        name: item.name,
        finished: item.finished,
        metatype: {
          connectOrCreate: {
            where: {
              name: 'Human'
            },
            create: {
              name: 'Human'
            }
          }
        },
        user: {
          connectOrCreate: {
            where: {
              name: "Admin",
            },
            create: {
              name: "Admin",
              email: "thorsten@eggers-bhv.de",
              password: hashUserPassword("password"),
              groups: {
                connectOrCreate: {
                  where: {
                    name: "Administrator"
                  },
                  create: {
                    name: "Administrator"
                  }
                }
              }
            }
          }
        },
      }
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })