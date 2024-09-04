import { Prisma, PrismaClient } from '@prisma/client'
import { hashUserPassword } from '../lib/hash';
import { attributes, metatypes, skillGroups, skills}  from '../lib/data'
import { fakerDE as faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const createFakeCharacter = () => {
  const metatype = faker.helpers.arrayElement(metatypes)

  return (
    {
      data: {
        name: faker.person.fullName(),
        metatypeId: metatype.id,
        user: {
          connectOrCreate: {
            where: { name: 'Thorsten' },
            create: {
              name: 'Thorsten',
              email: 'thorsten@eggers-bhv.de',
              password: hashUserPassword('password'),
              groups: {
                connectOrCreate: {
                  where: {
                    name: 'Administrator'
                  },
                  create: {
                    name: 'Administrator'
                  }
                }
              }
            }
          }
        },
        finished: false,
        attributes: {
          create: metatype.attribute.map((attribute) => {
            return {
              name: attribute.id,
              value: attribute.value,
              valueMax: attribute.maxValue
            }
          })
        }
      }
    }
  )
}

const fakeCharacters = Array.from({ length: 10 }).map(() => (
  createFakeCharacter()
))

async function main() {
  /*
  await prisma.user.create({
    data: {
      name: 'Thorsten',
      email: 'thorsten@eggers-bhv.de',
      password: hashUserPassword('password'),
      groups: {
        connectOrCreate: {
          where: {
            name: 'Administrator'
          },
          create: {
            name: 'Administrator'
          }
        }
      }
    }
  });
  */
  fakeCharacters.map(async (character) => {
    await prisma.character.create(character)
  })
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