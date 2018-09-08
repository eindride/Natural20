export const classInfo = {
  barbarian: {
    proficiencies: {
      armor: 'Light armor, medium armor, shields',
      weapons: 'Simple Weapons, Martial Weapons',
      tools: 'None',
    },
    skills: {
      choose: 2,
      from: ['animal handling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
    },
    savingThrows: {
      str: true,
      dex: false,
      con: true,
      int: false,
      wis: false,
      cha: false,
    },
    weaponChoices: [],
    armorChoices: [],
    packChoices: [],
    equipment: {
      weapons: ['greataxe', 'handaxe', 'javelin'],
      armor: [''],
      pack: ['explorer'],
      other: '',
    },
    hitDice: 'd12',
  },
  bard: {
    proficiencies: {
      armor: 'Light armor',
      weapons: 'Simple Weapons, hand crossbows, longswords, rapiers, shortswords',
      tools: 'Musical Instruments',
    },
    skills: {
      choose: 3,
      from: [
        'acrobatics',
        'animal handling',
        'arcana',
        'athletics',
        'deception',
        'history',
        'insight',
        'intimidation',
        'investigation',
        'medicine',
        'nature',
        'perception',
        'performance',
        'persuasion',
        'religion',
        'sleight of hand',
        'stealth',
        'survival',
      ],
    },
    savingThrows: {
      str: false,
      dex: true,
      con: false,
      int: false,
      wis: false,
      cha: true,
    },
    weaponChoices: ['rapier', 'longsword'],
    armorChoices: [],
    packChoices: ['diplomat', 'entertainer'],
    equipment: {
      weapons: ['dagger'],
      armor: ['leather'],
      pack: [],
      other: 'a lute',
    },
    hitDice: 'd8',
  },
  cleric: {
    proficiencies: {
      armor: 'Light Armor, Medium Armor, Shields',
      weapons: 'Simple Weapons',
      tools: 'None',
    },
    skills: {
      choose: 2,
      from: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
    },
    savingThrows: {
      str: false,
      dex: false,
      con: false,
      int: false,
      wis: true,
      cha: true,
    },
    weaponChoices: ['mace', 'warhammer'],
    armorChoices: ['scale', 'leather', 'chain'],
    packChoices: ['priest', 'explorer'],
    equipment: {
      weapons: ['light crossbow'],
      armor: ['shield'],
      pack: [],
      other: 'a holy Symbol',
    },
    hitDice: 'd8',
  },
  druid: {
    proficiencies: {
      armor: 'Light Armor, Medium Armor, Shields (druids will not wear armor or use Shields made of metal)',
      weapons: 'clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, spears',
      tools: 'Herbalism kit',
    },
    skills: {
      choose: 2,
      from: ['animal handling', 'arcana', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'],
    },
    savingThrows: {
      str: false,
      dex: false,
      con: false,
      int: true,
      wis: true,
      cha: false,
    },
    weaponChoices: [],
    armorChoices: [],
    packChoices: [],
    equipment: {
      weapons: ['scimitar'],
      armor: ['shield', 'leather'],
      pack: ['explorer'],
      other: 'a druidic focus',
    },
    hitDice: 'd8',
  },
  fighter: {
    proficiencies: {
      armor: 'Light Armor, Medium Armor, Heavy Armor, Shields',
      weapons: 'Simple Weapons, Martial Weapons',
      tools: 'None',
    },
    skills: {
      choose: 2,
      from: [
        'acrobatics',
        'animal handling',
        'athletics',
        'history',
        'insight',
        'intimidation',
        'perception',
        'survival',
      ],
    },
    savingThrows: {
      str: true,
      dex: false,
      con: true,
      int: false,
      wis: false,
      cha: false,
    },
    weaponChoices: ['light crossbow', 'handaxe'],
    armorChoices: ['chain', 'leather'],
    packChoices: ['dungeoneer', 'explorer'],
    equipment: {
      weapons: ['longsword'],
      armor: ['shield'],
      pack: [],
      other: '',
    },
    hitDice: 'd10',
  },
  monk: {
    proficiencies: {
      armor: 'none',
      weapons: 'Simple Weapons, shortswords',
      tools: 'Artisan tools',
    },
    skills: {
      choose: 2,
      from: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'],
    },
    savingThrows: {
      str: true,
      dex: true,
      con: false,
      int: false,
      wis: false,
      cha: false,
    },
    weaponChoices: [],
    armorChoices: [],
    packChoices: ['explorer', 'dungeoneer'],
    equipment: {
      weapons: ['shortsword', 'darts'],
      armor: [],
      pack: [],
      other: '',
    },
    hitDice: 'd8',
  },
  paladin: {
    proficiencies: {
      armor: 'Light Armor, Medium Armor, Heavy Armor, Shields',
      weapons: 'Simple Weapons, Martial Weapons',
      tools: 'None',
    },
    skills: {
      choose: 2,
      from: ['athletics', 'insight', 'intimidation', 'investigation', 'medicine', 'persuasion', 'religion'],
    },
    savingThrows: {
      str: false,
      dex: true,
      con: false,
      int: false,
      wis: false,
      cha: true,
    },
    weaponChoices: [],
    armorChoices: [],
    packChoices: ['priest', 'explorer'],
    equipment: {
      weapons: ['longsword', 'javelin'],
      armor: ['chain', 'shield'],
      pack: [],
      other: 'a holy Symbol',
    },
    hitDice: 'd10',
  },
  ranger: {
    proficiencies: {
      armor: 'Light Armor, Medium Armor, Shields',
      weapons: 'Simple Weapons, Martial Weapons',
      tools: 'None',
    },
    skills: {
      choose: 3,
      from: ['animal handling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival'],
    },
    savingThrows: {
      str: true,
      dex: true,
      con: false,
      int: false,
      wis: false,
      cha: false,
    },
    weaponChoices: [],
    armorChoices: ['scale', 'leather'],
    packChoices: ['dungeoneer', 'explorer'],
    equipment: {
      weapons: ['shortsword', 'longbow'],
      armor: [],
      pack: [],
      other: '',
    },
    hitDice: 'd10',
  },
  rogue: {
    proficiencies: {
      armor: 'Light armor',
      weapons: 'Simple Weapons, hand crossbows, longswords, rapiers, shortswords',
      tools: "Thieves' Tools",
    },
    skills: {
      choose: 4,
      from: [
        'acrobatics',
        'athletics',
        'deception',
        'insight',
        'intimidation',
        'investigation',
        'perception',
        'performance',
        'persuasion',
        'sleight of hand',
        'stealth',
      ],
    },
    savingThrows: {
      str: false,
      dex: true,
      con: false,
      int: true,
      wis: false,
      cha: false,
    },
    weaponChoices: ['rapier', 'shortsword'],
    armorChoices: [],
    packChoices: ['burglar', 'dungeoneer', 'explorer'],
    equipment: {
      weapons: ['shortbow', 'dagger'],
      armor: ['leather'],
      pack: [],
      other: "thieves' tools",
    },
    hitDice: 'd8',
  },
  sorcerer: {
    proficiencies: {
      armor: 'None',
      weapons: 'daggers, darts, slings, quarterstaffs, light crossbows',
      tools: 'None',
    },
    skills: {
      choose: 2,
      from: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'],
    },
    savingThrows: {
      str: false,
      dex: false,
      con: true,
      int: false,
      wis: false,
      cha: true,
    },
    weaponChoices: [],
    armorChoices: [],
    packChoices: ['dungeoneer', 'explorer'],
    equipment: {
      weapons: ['dagger', 'light crossbow'],
      armor: [],
      pack: [],
      other: 'an arcane focus',
    },
    hitDice: 'd6',
  },
  warlock: {
    proficiencies: {
      armor: 'Light armor',
      weapons: 'Simple Weapons',
      tools: 'None',
    },
    skills: {
      choose: 2,
      from: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'],
    },
    savingThrows: {
      str: false,
      dex: false,
      con: false,
      int: false,
      wis: true,
      cha: true,
    },
    weaponChoices: [],
    armorChoices: [],
    packChoices: ['scholar', 'dungeoneer'],
    equipment: {
      weapons: ['light crossbow', 'shortsword', 'dagger'],
      armor: ['leather'],
      pack: [],
      other: 'an arcane focus',
    },
    hitDice: 'd8',
  },
  wizard: {
    proficiencies: {
      armor: 'None',
      weapons: 'daggers, darts, slings, quarterstaffs, light crossbows',
      tools: 'none',
    },
    skills: {
      choose: 2,
      from: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'],
    },
    savingThrows: {
      str: false,
      dex: true,
      con: false,
      int: false,
      wis: false,
      cha: true,
    },
    weaponChoices: ['quarterstaff', 'dagger'],
    armorChoices: [],
    packChoices: ['scholar', 'explorer'],
    equipment: {
      weapons: [],
      armor: [],
      pack: [],
      other: 'an arcane focus, a Spellbook',
    },
    hitDice: 'd8',
  },
};

export const raceInfo = {
  dwarf: {
    attrIncrease: {
      str: 0,
      dex: 0,
      con: 2,
      int: 0,
      wis: 0,
      cha: 0,
    },
    speed: 25,
    subRaces: [
      {
        name: 'hill dwarf',
        attrIncrease: {
          str: 0,
          dex: 0,
          con: 0,
          int: 0,
          wis: 1,
          cha: 0,
        },
      },
      {
        name: 'mountain dwarf',
        attrIncrease: {
          str: 2,
          dex: 0,
          con: 0,
          int: 0,
          wis: 0,
          cha: 0,
        },
      },
    ],
  },
  elf: {
    attrIncrease: {
      str: 0,
      dex: 2,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    },
    speed: 30,
    subRaces: [
      {
        name: 'high elf',
        attrIncrease: {
          str: 0,
          dex: 0,
          con: 0,
          int: 1,
          wis: 0,
          cha: 0,
        },
      },
      {
        name: 'wood elf',
        attrIncrease: {
          str: 0,
          dex: 0,
          con: 0,
          int: 0,
          wis: 1,
          cha: 0,
        },
      },
      {
        name: 'dark elf(drow)',
        attrIncrease: {
          str: 0,
          dex: 0,
          con: 0,
          int: 0,
          wis: 0,
          cha: 1,
        },
      },
    ],
  },
  halfling: {
    attrIncrease: {
      str: 0,
      dex: 2,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    },
    speed: 25,
    subRaces: [
      {
        name: 'lightfoot',
        attrIncrease: {
          str: 0,
          dex: 0,
          con: 0,
          int: 0,
          wis: 0,
          cha: 1,
        },
      },
      {
        name: 'stout',
        attrIncrease: {
          str: 0,
          dex: 0,
          con: 1,
          int: 0,
          wis: 0,
          cha: 0,
        },
      },
    ],
  },
  human: {
    attrIncrease: {
      str: 1,
      dex: 1,
      con: 1,
      int: 1,
      wis: 1,
      cha: 1,
    },
    speed: 30,
  },
  dragonborn: {
    attrIncrease: {
      str: 2,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 1,
    },
    speed: 30,
  },
  gnome: {
    attrIncrease: {
      str: 0,
      dex: 0,
      con: 0,
      int: 2,
      wis: 0,
      cha: 0,
    },
    speed: 25,
    subRaces: [
      {
        name: 'forest gnome',
        attrIncrease: {
          str: 0,
          dex: 1,
          con: 0,
          int: 0,
          wis: 0,
          cha: 0,
        },
      },
      {
        name: 'rock gnome',
        attrIncrease: {
          str: 0,
          dex: 0,
          con: 1,
          int: 0,
          wis: 0,
          cha: 0,
        },
      },
    ],
  },
  'half elf': {
    attrIncrease: {
      str: 0,
      dex: 1,
      con: 0,
      int: 1,
      wis: 0,
      cha: 2,
    },
    speed: 30,
  },
  'half orc': {
    attrIncrease: {
      str: 2,
      dex: 0,
      con: 1,
      int: 0,
      wis: 0,
      cha: 0,
    },
    speed: 30,
  },
  tiefling: {
    attrIncrease: {
      str: 0,
      dex: 0,
      con: 0,
      int: 1,
      wis: 0,
      cha: 2,
    },
    speed: 30,
  },
};

const SLASHING = 'slashing';
const PIERCING = 'piercing';
const BLUDGEONING = 'bludgeoning';

export const weaponsInfo = {
  greataxe: {
    type: SLASHING,
    damage: '1d12',
    finesse: false,
  },
  handaxe: {
    type: SLASHING,
    damage: '1d6',
    finesse: false,
  },
  javelin: {
    type: PIERCING,
    damage: '1d6',
    finesse: false,
  },
  rapier: {
    type: PIERCING,
    damage: '1d8',
    finesse: true,
  },
  longsword: {
    type: SLASHING,
    damage: '1d8/1d10',
    finesse: false,
  },
  dagger: {
    type: PIERCING,
    damage: '1d4',
    finesse: true,
  },
  mace: {
    type: BLUDGEONING,
    damage: '1d6',
    finesse: false,
  },
  warhammer: {
    type: BLUDGEONING,
    damage: '1d8/1d10',
    finesse: false,
  },
  'light crossbow': {
    type: PIERCING,
    damage: '1d8',
    finesse: true,
  },
  scimitar: {
    type: SLASHING,
    damage: '1d8',
    finesse: true,
  },
  longbow: {
    type: PIERCING,
    damage: '1d8',
    finesse: true,
  },
  shortsword: {
    type: PIERCING,
    damage: '1d6',
    finesse: true,
  },
  shortbow: {
    type: PIERCING,
    damage: '1d6',
    finesse: true,
  },
  quarterstaff: {
    type: BLUDGEONING,
    damage: '1d6/1d8',
    finesse: false,
  },
  dart: {
    type: PIERCING,
    damage: '1d4',
    finesse: true,
  },
};

export const armorsInfo = {
  leather: {
    baseAC: 11,
    modifierLimit: 999,
  },
  scale: {
    base: 14,
    modifierLimit: 2,
  },
  chain: {
    base: 16,
    modifierLimit: 0,
  },
};

export const packsInfo = {
  burglar:
    'a Backpack, a bag of 1,000 Ball bearings, 10 feet of string, a bell, 5 candles, a Crowbar, a Hammer, 10 pitons, a Hooded lantern, 2 flasks of oil, 5 days Rations, a Tinderbox, a Waterskin, 50 feet of Hempen rope',
  diplomat:
    'a chest, 2 cases for maps and scrolls, a set of Fine clothes, a bottle of ink, an Ink pen, a lamp, 2 flasks of oil, 5 sheets of paper, a vial of Perfume, Sealing wax, soap',
  dungeoneer:
    'a Backpack, a Crowbar, a Hammer, 10 pitons, 10 torches, a Tinderbox, 10 days of Rations, a Waterskin, 50 feet of Hempen rope',
  entertainer: 'a Backpack, a Bedroll, 2 costumes, 5 candles, 5 days of Rations, a Waterskin, a Disguise Kit',
  explorer:
    'a Backpack, a Bedroll, a Mess kit, a Tinderbox, 10 torches, 10 days of Rations, a Waterskin, 50 feet of Hempen rope',
  priest:
    'a Backpack, a Blanket, 10 candles, a Tinderbox, an alms box, 2 blocks of incense, a censer, vestments, 2 days of Rations, a Waterskin',
  scholar:
    'a Backpack, a book of lore, a bottle of ink, an Ink pen, 10 sheets of Parchment, a little bag of sand, a small knife',
};
