export const attributes =
[
  {
    id: "body",
    name: "Body",
    shortname: "BOD",
    isdefault: true
  },
  {
    id: "agility",
    name: "Agility",
    shortname: "AGI",
    isdefault: true
  },
  {
    id: "reaction",
    name: "Reaction",
    shortname: "REA",
    isdefault: true
  },
  {
    id: "strength",
    name: "Strength",
    shortname: "STR",
    isdefault: true
  },
  {
    id: "willpower",
    name: "Willpower",
    shortname: "WIL",
    isdefault: true
  },
  {
    id: "logic",
    name: "Logic",
    shortname: "LOG",
    isdefault: true
  },
  {
    id: "intuition",
    name: "Intuition",
    shortname: "INT",
    isdefault: true
  },
  {
    id: "charisma",
    name: "Charisma",
    shortname: "CHA",
    isdefault: true
  },
  {
    id: "edge",
    name: "Edge",
    shortname: "EDG",
    isdefault: true
  },
  {
    id: "essence",
    name: "Essence",
    shortname: "ESS",
    isdefault: true
  },
  {
    id: "magic",
    name: "Magic",
    shortname: "MAG",
    isdefault: false
  },
  {
    id: "resonance",
    name: "Resonance",
    shortname: "RES",
    isdefault: false
  }
]

export const skillGroups = 
[
  { name: "Acting" },
  { name: "Athletics" },
  { name: "ABiotech" },
  { name: "Close Combat" },
  { name: "Conjuring" },
  { name: "Cracking" },
  { name: "Electronics" },
  { name: "Enchanting" },
  { name: "Firearms" },
  { name: "Influence" },
  { name: "Engineering" },
  { name: "Outdoors" },
  { name: "Sorcery" },
  { name: "Stealth" },
  { name: "Tasking" }
]

export const skills =
[
  {
    name: "Archery",
    default: true,
    attribute: "Agility",
    group: null
  },
  {
    name: "Automatics",
    default: true,
    attribute: "Agility",
    group: "Firearms"
  },
  {
    name: "Blades",
    default: true,
    attribute: "Agility",
    group: "Close Combat"
  },
  {
    name: "Clubs",
    default: true,
    attribute: "Agility",
    group: "Close Combat"
  },
  {
    name: "Escape Artist",
    default: true,
    attribute: "Agility",
    group: null
  },
  {
    name: "Exotic Melee Weapon",
    default: false,
    attribute: "Agility",
    group: null
  },
  {
    name: "Exotic Ranged Weapon",
    default: false,
    attribute: "Agility",
    group: null
  },
  {
    name: "Gunnery",
    default: true,
    attribute: "Agility",
    group: null
  },
  {
    name: "Gymnastics",
    default: true,
    attribute: "Agility",
    group: "Athletics"
  },
  {
    name: "Heavy Weapons",
    default: true,
    attribute: "Agility",
    group: null
  },
  {
    name: "Locksmith",
    default: true,
    attribute: "Agility",
    group: null
  },
  {
    name: "Longarms",
    default: true,
    attribute: "Agility",
    group: "Firearms"
  },
  {
    name: "Palming",
    default: true,
    attribute: "Agility",
    group: "Stealth"
  },
  {
    name: "Pistols",
    default: true,
    attribute: "Agility",
    group: "Firearms"
  },
  {
    name: "Sneaking",
    default: true,
    attribute: "Agility",
    group: "Stealth"
  },
  {
    name: "Throwing Weapons",
    default: true,
    attribute: "Agility",
    group: null
  },
  {
    name: "Unarmed Combat",
    default: true,
    attribute: "Agility",
    group: "Close Combat"
  },
  {
    name: "Diving",
    default: true,
    attribute: "Body",
    group: null
  },
  {
    name: "Free-Fall",
    default: true,
    attribute: "Body",
    group: null
  },
  {
    name: "Pilot Aerospace",
    default: false,
    attribute: "Reaction",
    group: null
  },
  {
    name: "Pilot Aircraft",
    default: false,
    attribute: "Reaction",
    group: null
  },
  {
    name: "Pilot Exotic Vehicle",
    default: false,
    attribute: "Reaction",
    group: null
  },
  {
    name: "Pilot Ground Craft",
    default: true,
    attribute: "Reaction",
    group: null
  },
  {
    name: "Pilot Walker",
    default: false,
    attribute: "Reaction",
    group: null
  },
  {
    name: "Pilot Watercraft",
    default: false,
    attribute: "Reaction",
    group: null
  },
  {
    name: "Running",
    default: true,
    attribute: "Strength",
    group: "Athletics"
  },
  {
    name: "Swimming",
    default: true,
    attribute: "Strength",
    group: "Athletics"
  },
  {
    name: "Animal Handling",
    default: true,
    attribute: "Charisma",
    group: null
  }
]

export const metatypes =
[
  {
    id: "human",
    name: "Human",
    attribute:
      [
        {
          id: "body",
          value: 1,
          maxValue: 6
        },
        {
          id: "agility",
          value: 1,
          maxValue: 6
        },
        {
          id: "reaction",
          value: 1,
          maxValue: 6
        },
        {
          id: "strength",
          value: 1,
          maxValue: 6
        },
        {
          id: "willpower",
          value: 1,
          maxValue: 6
        },
        {
          id: "logic",
          value: 1,
          maxValue: 6
        },
        {
          id: "intuition",
          value: 1,
          maxValue: 6
        },
        {
          id: "charisma",
          value: 1,
          maxValue: 6
        },
        {
          id: "edge",
          value: 2,
          maxValue: 7
        },
        {
          id: "essence",
          value: 6,
          maxValue: 6
        }
      ]
    },
  {
    id: "elf",
    name: "Elf",
    attribute:
      [
        {
          id: "body",
          value: 1,
          maxValue: 6
        },
        {
          id: "agility",
          value: 2,
          maxValue: 7
        },
        {
          id: "reaction",
          value: 1,
          maxValue: 6
        },
        {
          id: "strength",
          value: 1,
          maxValue: 6
        },
        {
          id: "willpower",
          value: 1,
          maxValue: 6
        },
        {
          id: "logic",
          value: 1,
          maxValue: 6
        },
        {
          id: "intuition",
          value: 1,
          maxValue: 6
        },
        {
          id: "charisma",
          value: 3,
          maxValue: 8
        },
        {
          id: "edge",
          value: 1,
          maxValue: 6
        },
        {
          id: "essence",
          value: 6,
          maxValue: 6
        }
      ]
  },
  {
    id: "dwarf",
    name: "Dwarf",
    attribute:
      [
        {
          id: "body",
          value: 3,
          maxValue: 8
        },
        {
          id: "agility",
          value: 1,
          maxValue: 6
        },
        {
          id: "reaction",
          value: 1,
          maxValue: 5
        },
        {
          id: "strength",
          value: 3,
          maxValue: 8
        },
        {
          id: "willpower",
          value: 2,
          maxValue: 7
        },
        {
          id: "logic",
          value: 1,
          maxValue: 6
        },
        {
          id: "intuition",
          value: 1,
          maxValue: 6
        },
        {
          id: "charisma",
          value: 1,
          maxValue: 6
        },
        {
          id: "edge",
          value: 1,
          maxValue: 6
        },
        {
          id: "essence",
          value: 6,
          maxValue: 6
        }
      ]
  },
  {
    id: "ork",
    name: "Ork",
    attribute:
      [
        {
          id: "body",
          value: 4,
          maxValue: 9
        },
        {
          id: "agility",
          value: 1,
          maxValue: 6
        },
        {
          id: "reaction",
          value: 1,
          maxValue: 6
        },
        {
          id: "strength",
          value: 3,
          maxValue: 8
        },
        {
          id: "willpower",
          value: 1,
          maxValue: 6
        },
        {
          id: "logic",
          value: 1,
          maxValue: 5
        },
        {
          id: "intuition",
          value: 1,
          maxValue: 5
        },
        {
          id: "charisma",
          value: 1,
          maxValue: 4
        },
        {
          id: "edge",
          value: 1,
          maxValue: 6
        },
        {
          id: "essence",
          value: 6,
          maxValue: 6
        }
      ]
  },
  {
    id: "troll",
    name: "Troll",
    attribute:
      [
        {
          id: "body",
          value: 5,
          maxValue: 10
        },
        {
          id: "agility",
          value: 1,
          maxValue: 5
        },
        {
          id: "reaction",
          value: 1,
          maxValue: 6
        },
        {
          id: "strength",
          value: 5,
          maxValue: 10
        },
        {
          id: "willpower",
          value: 1,
          maxValue: 6
        },
        {
          id: "logic",
          value: 1,
          maxValue: 5
        },
        {
          id: "intuition",
          value: 1,
          maxValue: 5
        },
        {
          id: "charisma",
          value: 1,
          maxValue: 4
        },
        {
          id: "edge",
          value: 1,
          maxValue: 6
        },
        {
          id: "essence",
          value: 6,
          maxValue: 6
        }
      ]
    }
]
 