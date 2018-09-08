const TITLE = 'title';
const SUBTITLE = 'subtitle';
const PARAGRAPH = 'paragraph';
const LIST = 'list';

export const officialClasses = [
  'barbarian',
  'bard',
  'cleric',
  'druid',
  'fighter',
  'monk',
  'paladin',
  'ranger',
  'rogue',
  'sorcerer',
  'warlock',
  'wizard',
];

export const dummyContent = [
  {
    type: TITLE,
    content: 'This is a title',
  },
  {
    type: PARAGRAPH,
    content:
      'Bacon ipsum dolor amet turducken ribeye pork belly kielbasa tri-tip. Sausage alcatra buffalo porchetta tenderloin tri-tip shank bresaola corned beef. Sirloin jerky porchetta, salami alcatra filet mignon kielbasa bacon leberkas spare ribs ham hock. Sirloin prosciutto bacon, meatloaf kielbasa salami ham jowl rump pork beef ribs shankle shoulder. Doner brisket strip steak meatloaf, sausage picanha jerky beef ribs alcatra pancetta ribeye tongue biltong kielbasa. Tri-tip spare ribs brisket pork chop, doner hamburger pastrami biltong frankfurter venison beef. Cow beef pig jowl pastrami picanha buffalo short loin pork t-bone.',
  },
  {
    type: SUBTITLE,
    content: 'A Subtitle',
  },
  {
    type: PARAGRAPH,
    content:
      'Pork belly corned beef pig, turkey andouille beef sirloin turducken tongue tail. Landjaeger sirloin short loin leberkas pork, shank kevin tail. Jowl pig tri-tip pork chop tail prosciutto leberkas. Turkey andouille venison, doner pancetta hamburger short ribs pork belly kielbasa. Chicken ham hock pork swine frankfurter biltong shoulder jerky meatloaf tongue alcatra filet mignon beef ribs ribeye.',
  },
  {
    type: LIST,
    content: [
      {
        title: 'Bacon.',
        content:
          'Kevin shankle porchetta bresaola fatback, shank andouille ribeye beef short loin doner. Pastrami drumstick tongue landjaeger chuck prosciutto. Cupim hamburger strip steak, ribeye leberkas biltong filet mignon tongue fatback meatball corned beef swine shoulder porchetta. Chicken pancetta pig buffalo landjaeger picanha frankfurter t-bone short loin.',
      },
      {
        title: 'Bacon.',
        content:
          'Kevin shankle porchetta bresaola fatback, shank andouille ribeye beef short loin doner. Pastrami drumstick tongue landjaeger chuck prosciutto. Cupim hamburger strip steak, ribeye leberkas biltong filet mignon tongue fatback meatball corned beef swine shoulder porchetta. Chicken pancetta pig buffalo landjaeger picanha frankfurter t-bone short loin.',
      },
    ],
  },
];

export const damageTypes = [
  'acid',
  'bludgeoning',
  'cold',
  'fire',
  'force',
  'lightning',
  'magical',
  'necrotic',
  'piercing',
  'poison',
  'psychic',
  'radiant',
  'slashing',
  'thunder',
];

export const conditions = [
  'blinded',
  'charmed',
  'deafened',
  'exhausted',
  'fatigued',
  'frightened',
  'grappled',
  'incapacitated',
  'invisible',
  'paralyzed',
  'petrified',
  'poisoned',
  'prone',
  'restrained',
  'stunned',
  'unconscious',
];

export const challengeRating = {
  '0': 10,
  '1/8': 25,
  '1/4': 50,
  '1/2': 100,
  '1': 200,
  '2': 450,
  '3': 700,
  '4': 1100,
  '5': 1800,
  '6': 2300,
  '7': 2900,
  '8': 3900,
  '9': 5000,
  '10': 5900,
  '11': 7200,
  '12': 8400,
  '13': 10000,
  '14': 11500,
  '15': 13000,
  '16': 15000,
  '17': 18000,
  '18': 20000,
  '19': 22000,
  '20': 25000,
  '21': 33000,
  '22': 41000,
  '23': 50000,
  '24': 62000,
  '25': 75000,
  '26': 90000,
  '27': 105000,
  '28': 120000,
  '29': 135000,
  '30': 155000,
};

export const creatureSizes = ['tiny', 'small', 'medium', 'large', 'huge', 'gargantuam'];

export const creatureTypes = [
  'abberation',
  'beast',
  'celestial',
  'construct',
  'dragon',
  'elemental',
  'fey',
  'fiend',
  'giant',
  'humanoid',
  'monstrosity',
  'ooze',
  'plant',
  'undead',
];

export const alignments = [
  'any alignment',
  'unaligned',
  'lawful good',
  'lawful neutral',
  'lawful evil',
  'neutral good',
  'true neutral',
  'neutral evil',
  'chaotic good',
  'chaotic neutral',
  'chaotic evil',
];

export const shortAttributes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export const skillNames = [
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
];

export const spellSchools = [
  'abjuration',
  'conjuration',
  'divination',
  'enchantment',
  'evocation',
  'illusion',
  'necromancy',
  'transmutation',
];

export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export const dummyComments = [
  {
    author: 'user1',
    date: '2018, 1 sep, 15:21',
    message:
      'Bacon ipsum dolor amet pastrami pork fatback burgdoggen beef. Porchetta hamburger picanha fatback filet mignon pork loin pastrami. Short loin cupim pig flank, buffalo chicken jerky chuck kielbasa tri-tip cow filet mignon rump. Porchetta meatball tenderloin pork loin. Landjaeger capicola chicken, pancetta meatloaf pastrami tri-tip doner.',
  },
  {
    author: 'user2',
    date: '2018, 1 sep, 14:33',
    message:
      'Bacon ipsum dolor amet pastrami pork fatback burgdoggen beef. Porchetta hamburger picanha fatback filet mignon pork loin pastrami. Short loin cupim pig flank, buffalo chicken jerky chuck kielbasa tri-tip cow filet mignon rump. Porchetta meatball tenderloin pork loin. Landjaeger capicola chicken, pancetta meatloaf pastrami tri-tip doner.',
  },
  {
    author: 'user1',
    date: '2018, 1 sep, 14:30',
    message:
      'Bacon ipsum dolor amet pastrami pork fatback burgdoggen beef. Porchetta hamburger picanha fatback filet mignon pork loin pastrami. Short loin cupim pig flank, buffalo chicken jerky chuck kielbasa tri-tip cow filet mignon rump. Porchetta meatball tenderloin pork loin. Landjaeger capicola chicken, pancetta meatloaf pastrami tri-tip doner.',
  },
];

export const officialRaces = [
  'dragonborn',
  'dwarf',
  'elf',
  'gnome',
  'half elf',
  'half orc',
  'halfling',
  'human',
  'tiefling',
];
