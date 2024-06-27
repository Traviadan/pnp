import { GameAttribute, GameSkillGroup, Prisma, PrismaClient } from '@prisma/client'
import hashUserPassword from '../lib/hash';
import characters from './characters.json';
import game_attributes from './game_attributes.json';
import game_skills from './game_skills.json'
import game_skill_groups from './game_skill_groups.json';

const prisma = new PrismaClient()

const createGameSkill = (
  skillName: string,
  attributeName: string,
  attributeShort: string,
  attributeDefault: boolean
) => {
  return Prisma.validator<Prisma.GameSkillCreateInput>()({
    name: skillName,
    gameAttribute: {
      connectOrCreate: {
        where: {
          name: attributeName
            },
        create: {
          name: attributeName,
          shortname: attributeShort,
          default: attributeDefault
        }
      }
    }
  })
}

const createManyGameSkill = (
  skillName: string,
  attributeId: number,
  skillGroupId: number
) => {
  let newData = null;
  if (skillGroupId < 0) {
    newData = {
      name: skillName,
      attributeId: attributeId
    };
  } else {
    newData = {
      name: skillName,
      attributeId: attributeId,
      gameSkillGroupId: skillGroupId
    };
  }
  return Prisma.validator<Prisma.GameSkillCreateManyInput>()(newData)
}

async function main() {
  var dbAttributes = [];
  for (const item of game_attributes) {
    const createGameAttribute: Prisma.GameAttributeCreateInput = item;
    let result = await prisma.gameAttribute.create({
      data: createGameAttribute
    })
    dbAttributes[result.id] = result;
  }
  var dbSkillGroups = [];
  for (const item of game_skill_groups) {
    const createGameSkillGroup: Prisma.GameSkillGroupCreateInput = item;
    let result = await prisma.gameSkillGroup.create({
      data: createGameSkillGroup
    })
    dbSkillGroups[result.id] = result;
  }

  let createSkills = [];
  for (const item of game_skills) {
    let attributeId = -1;
    let groupId = -1;
    if (item.group && item.group != "") {
      dbSkillGroups.forEach((element) => {
        if (element.name == item.group) {
          groupId = element.id;
          return;
        }
      })
    }
    dbAttributes.forEach((element) => {
      if (element.name == item.attribute) {
        attributeId = element.id;
        return;
      }
    })
    if (attributeId > 0) {
      createSkills.push(createManyGameSkill(item.name, attributeId, groupId));
    }
  }
  let result = await prisma.gameSkill.createMany({
    data: createSkills
  });

  for (const item of characters) {
    const createCharacter: Prisma.CharacterCreateWithoutUserInput = item;
    let newCharacter = await prisma.character.create({
      data: {
        name: item.name,
        user: {
          connectOrCreate: {
            where: {
              name: "Admin",
            },
            create: {
              name: "Admin",
              password: hashUserPassword("password")
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