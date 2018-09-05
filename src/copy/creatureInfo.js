const TITLE = 'title';
const SUBTITLE = 'subtitle';
const PARAGRAPH = 'paragraph';
const LIST = 'list';

export default {
  size: [
    {
      type: TITLE,
      content: 'Size',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster can be Tiny, Small, Medium, Large, Huge, or Gargantuan. Categories shows how much space a creature of a particular size controls in Combat.',
    },
    {
      type: LIST,
      content: [
        {
          title: 'Tiny',
          content: '	2½ by 2½ ft.',
        },
        {
          title: 'Small',
          content: '	5 by 5 ft.',
        },
        {
          title: 'Medium',
          content: '	5 by 5 ft.',
        },
        {
          title: 'Large',
          content: '	10 by 10 ft.',
        },
        {
          title: 'Huge',
          content: '	15 by 15 ft.',
        },
        {
          title: 'Gargantuan',
          content: '20 by 20 ft. or larger',
        },
      ],
    },
  ],
  type: [
    {
      type: TITLE,
      content: 'Type',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster’s type speaks to its fundamental Nature. Certain Spells, Magic Items, Class Features, and other effects in the game interact in Special ways with creatures of a particular type. For example, an arrow of dragon slaying deals extra damage not only to Dragons but also other creatures of the dragon type, such as dragon turtles and wyverns.',
    },
    {
      type: PARAGRAPH,
      content: 'The game includes the following monster types, which have no rules of their own.',
    },
    {
      type: LIST,
      content: [
        {
          title: 'Aberrations',
          content:
            'are utterly alien beings. Many of them have innate magical Abilities drawn from the creature’s alien mind rather than the mystical forces of the world. The quintessential Aberrations are aboleths, Beholders, Mind Flayers, and slaadi.',
        },
        {
          title: 'Celestials',
          content:
            'are creatures native to the Upper Planes. Many of them are the servants of deities, employed as messengers or agents in the mortal realm and throughout the planes. Celestials are good by Nature, so the exceptional Celestial who strays from a good alignment is a horrifying rarity. Celestials include angels, couatls, and pegasi.',
        },
        {
          title: 'Constructs',
          content:
            'are made, not born. Some are programmed by their creators to follow a simple set of instructions, while others are imbued with sentience and capable of independent thought. Golems are the iconic constructs. Many creatures native to the outer plane of Mechanus, such as modrons, are constructs shaped from the raw material of the plane by the will of more powerful creatures.',
        },
        {
          title: 'Dragons',
          content:
            'are large reptilian creatures of ancient Origin and tremendous power. True Dragons, including the good metallic Dragons and the evil chromatic Dragons, are highly intelligent and have innate magic. Also in this category are creatures distantly related to true Dragons, but less powerful, less intelligent, and less magical, such as wyverns and pseudodragons.',
        },
        {
          title: 'Elementals',
          content:
            'are creatures native to the elemental planes. Some creatures of this type are little more than animate masses of their respective elements, including the creatures simply called Elementals. Others have biological forms infused with elemental energy. The races of genies, including djinn and efreet, form the most important civilizations on the elemental planes. Other elemental creatures include azers, and Invisible stalkers.',
        },
        {
          title: 'Fey',
          content:
            'are magical creatures closely tied to the forces of Nature. They dwell in twilight groves and misty forests. In some worlds, they are closely tied to the Feywild, also called the Plane of Faerie. Some are also found in the Outer Planes, particularly the planes of Arborea and the Beastlands. Fey include dryads, pixies, and satyrs.',
        },
        {
          title: 'Giants',
          content:
            'tower over humans and their kind. They are humanlike in shape, though some have multiple heads (ettins) or deformities (fomorians). The six varieties of true giant are Hill Giants, Stone Giants, Frost Giants, Fire Giants, Cloud Giants, and Storm Giants. Besides these, creatures such as ogres and Trolls are Giants.',
        },
        {
          title: 'Humanoids',
          content:
            'are the main peoples of a fantasy gaming world, both civilized and savage, including humans and a tremendous variety of other species. They have language and culture, few if any innate magical Abilities (though most humanoids can learn spellcasting), and a bipedal form. The most Common humanoid races are the ones most suitable as player characters: humans, Dwarves, elves, and Halflings. Almost as numerous but far more savage and brutal, and almost uniformly evil, are the races of Goblinoids (goblins, Hobgoblins, and bugbears), orcs, Gnolls, Lizardfolk, and Kobolds.',
        },
        {
          title: 'Monstrosities',
          content:
            'are Monsters in the strictest sense—frightening creatures that are not ordinary, not truly natural, and almost never benign. Some are the results of magical experimentation gone awry (such as owlbears), and others are the product of terrible curses (including minotaurs and yuan-ti). They defy categorization, and in some sense serve as a catch-all category for creatures that don’t fit into any other type.',
        },
        {
          title: 'Oozes',
          content:
            'are gelatinous creatures that rarely have a fixed shape. They are mostly subterranean, dwelling in caves and dungeons and feeding on refuse, carrion, or creatures unlucky enough to get in their way. Black puddings and gelatinous cubes are among the most recognizable oozes.',
        },
        {
          title: 'Plants',
          content:
            'in this context are vegetable creatures, not ordinary flora. Most of them are ambulatory, and some are carnivorous. The quintessential Plants are the Shambling Mound and the Treant. Fungal creatures such as the Gas Spore and the myconid also fall into this category.',
        },
        {
          title: 'Undead',
          content:
            'Undead are once-living creatures brought to a horrifying state of undeath through the practice of necromantic magic or some unholy curse. Undead include walking corpses, such as vampires and zombies, as well as bodiless spirits, such as ghosts and specters.',
        },
      ],
    },
  ],
  alignment: [
    {
      type: TITLE,
      content: 'Alignment',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster’s alignment provides a clue to its disposition and how it behaves in a Roleplaying or Combat situation. For example, a chaotic evil monster might be difficult to reason with and might Attack characters on sight, whereas a neutral monster might be willing to negotiate.',
    },
    {
      type: PARAGRAPH,
      content:
        'The alignment specified in a monster’s stat block is the default. Feel free to depart from it and change a monster’s alignment to suit the needs of your campaign. If you want a good-aligned green dragon or an evil Storm Giant, there’s nothing stopping you.',
    },
    {
      type: PARAGRAPH,
      content:
        'Some creatures can have any alignment. In other words, you choose the monster’s alignment. Some monster’s alignment entry indicates a tendency or aversion toward law, chaos, good, or evil. For example, a Berserker can be any chaotic alignment (chaotic good, chaotic neutral, or chaotic evil), as befits its wild Nature.',
    },
    {
      type: PARAGRAPH,
      content:
        'Many creatures of low Intelligence have no comprehension of law or chaos, good or evil. They don’t make moral or ethical choices, but rather act on instinct. These creatures are unaligned, which means they don’t have an alignment.',
    },
  ],
  ac: [
    {
      type: TITLE,
      content: 'Armor Class',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster that wears armor or carries a Shield has an Armor Class (AC) that takes its armor, Shield, and Dexterity into account. Otherwise, a monster’s AC is based on its Dexterity modifier and natural armor, if any. If a monster has natural armor, wears armor, or carries a Shield, this is noted in parentheses after its AC value.',
    },
  ],
  hitPoints: [
    {
      type: TITLE,
      content: 'Hit Points',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster usually dies or is destroyed when it drops to 0 hit points. A monster’s hit points are presented both as a die expression and as an average number. For example, a monster with 2d8 hit points has 9 hit points on average (2 × 4½).',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster’s Constitution modifier also affects the number of hit points it has. Its Constitution modifier is multiplied by the number of Hit Dice it possesses, and the result is added to its hit points. For example, if a monster has a Constitution of 12 (+1 modifier) and 2d8 Hit Dice, it has 2d8 + 2 hit points (average 11).',
    },
  ],
  speed: [
    {
      type: TITLE,
      content: 'Speed',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster’s speed tells you how far it can move on its turn. All creatures have a walking speed, simply called the monster’s speed. Creatures that have no form of ground-based locomotion have a walking speed of 0 feet. Some creatures have one or more of the following additional Movement modes.',
    },
    {
      type: LIST,
      content: [
        {
          title: 'Burrow',
          content:
            'A monster that has a burrowing speed can use that speed to move through sand, earth, mud, or ice. A monster can’t burrow through solid rock unless it has a Special trait that allows it to do so.',
        },
        {
          title: 'Climb',
          content:
            'A monster that has a climbing speed can use all or part of its Movement to move on vertical surfaces. The monster doesn’t need to spend extra Movement to climb.',
        },
        {
          title: 'Fly',
          content:
            'A monster that has a flying speed can use all or part of its Movement to fly. Some Monsters have the ability to hover, which makes them hard to knock out of the air (as explained in the rules on flying). Such a monster stops hovering when it dies.',
        },
        {
          title: 'Swim',
          content: "A monster that has a swimming speed doesn't need to spend extra Movement to swim.",
        },
      ],
    },
  ],
  savingThrows: [
    {
      type: TITLE,
      content: 'Saving Throws',
    },
    {
      type: PARAGRAPH,
      content:
        'The Saving Throws entry is reserved for creatures that are adept at resisting certain kinds of effects. For example, a creature that isn’t easily Charmed or Frightened might gain a bonus on its Wisdom Saving Throws. Most creatures don’t have Special saving throw bonuses, in which case this section is absent.',
    },
    {
      type: PARAGRAPH,
      content:
        'A saving throw bonus is the sum of a monster’s relevant ability modifier and its proficiency bonus, which is determined by the monster’s challenge rating.',
    },
  ],
  skills: [
    {
      type: TITLE,
      content: 'Skills',
    },
    {
      type: PARAGRAPH,
      content:
        'The Skills entry is reserved for Monsters that are proficient in one or more Skills. For example, a monster that is very perceptive and stealthy might have bonuses to Wisdom (Perception) and Dexterity (Stealth) checks.',
    },
    {
      type: PARAGRAPH,
      content:
        'A skill bonus is the sum of a monster’s relevant ability modifier and its proficiency bonus, which is determined by the monster’s challenge rating (as shown in the Proficiency Bonus by Challenge Rating table). Other modifiers might apply. For instance, a monster might have a larger-than-expected bonus (usually double its proficiency bonus) to account for its heightened expertise.',
    },
  ],
  vulnerabilities: [
    {
      type: TITLE,
      content: 'Vulnerabilities, Resistances, and Immunities',
    },
    {
      type: PARAGRAPH,
      content:
        'Some creatures have vulnerability, Resistance, or immunity to certain types of damage. Particular creatures are even resistant or immune to damage from nonmagical attacks (a magical Attack is an Attack delivered by a spell, a magic item, or another magical source). In addition, some creatures are immune to certain Conditions.',
    },
  ],
  senses: [
    {
      type: TITLE,
      content: 'Senses',
    },
    {
      type: PARAGRAPH,
      content:
        'The Senses entry notes a monster’s passive Wisdom (Perception) score, as well as any Special senses the monster might have. Special senses are described below.',
    },
    {
      type: SUBTITLE,
      content: 'Blindsight',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster with Blindsight can perceive its surroundings without relying on sight, within a specific radius.',
    },
    {
      type: PARAGRAPH,
      content:
        'Creatures without eyes, such as Grimlocks and gray oozes, typically have this Special sense, as do creatures with echolocation or heightened senses, such as bats and true Dragons.',
    },
    {
      type: PARAGRAPH,
      content:
        'If a monster is naturally blind, it has a parenthetical note to this effect, indicating that the radius of its Blindsight defines the maximum range of its Perception.',
    },
    {
      type: SUBTITLE,
      content: 'Darkvision',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster with Darkvision can see in the dark within a specific radius. The monster can see in dim light within the radius as if it were bright light, and in Darkness as if it were dim light. The monster can’t discern color in Darkness, only shades of gray. Many creatures that live underground have this Special sense.',
    },
    {
      type: SUBTITLE,
      content: 'Tremorsense',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster with tremorsense can detect and pinpoint the Origin of vibrations within a specific radius, provided that the monster and the source of the vibrations are in contact with the same ground or substance. Tremorsense can’t be used to detect flying or incorporeal creatures. Many burrowing creatures, such as ankhegs and umber hulks, have this Special sense.',
    },
    {
      type: SUBTITLE,
      content: 'Truesight',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster with Truesight can, out to a specific range, see in normal and magical Darkness, see Invisible creatures and Objects, automatically detect visual illusions and succeed on Saving Throws against them, and perceive the original form of a Shapechanger or a creature that is transformed by magic. Furthermore, the monster can see into the Ethereal Plane within the same range.',
    },
  ],
  languages: [
    {
      type: TITLE,
      content: 'Languages',
    },
    {
      type: PARAGRAPH,
      content:
        'The Languages that a monster can speak are listed in alphabetical order. Sometimes a monster can understand a language but can’t speak it, and this is noted in its entry. A “—” indicates that a creature neither speaks nor understands any language.',
    },
    {
      type: SUBTITLE,
      content: 'Telepathy',
    },
    {
      type: PARAGRAPH,
      content:
        'Telepathy is a magical ability that allows a monster to communicate mentally with another creature within a specified range. The contacted creature doesn’t need to share a language with the monster to communicate in this way with it, but it must be able to understand at least one language. A creature without Telepathy can receive and respond to telepathic messages but can’t initiate or terminate a telepathic conversation.',
    },
    {
      type: PARAGRAPH,
      content:
        'A telepathic monster doesn’t need to see a contacted creature and can end the telepathic contact at any time. The contact is broken as soon as the two creatures are no longer within range of each other or if the telepathic monster contacts a different creature within range. A telepathic monster can initiate or terminate a telepathic conversation without using an action, but while the monster is Incapacitated, it can’t initiate telepathic contact, and any current contact is terminated.',
    },
    {
      type: PARAGRAPH,
      content:
        'A creature within the area of an Antimagic Field or in any other location where magic doesn’t function can’t send or receive telepathic messages.',
    },
  ],
  challenge: [
    {
      type: TITLE,
      content: 'Challenge',
    },
    {
      type: PARAGRAPH,
      content:
        'A monster’s challenge rating tells you how great a threat the monster is. An appropriately equipped and well-rested party of four adventurers should be able to defeat a monster that has a challenge rating equal to its level without suffering any deaths. For example, a party of four 3rd-level characters should find a monster with a challenge rating of 3 to be a worthy challenge, but not a deadly one.',
    },
    {
      type: PARAGRAPH,
      content:
        'Monsters that are significantly weaker than 1st- level characters have a challenge rating lower than 1. Monsters with a challenge rating of 0 are insignificant except in large numbers; those with no effective attacks are worth no Experience Points, while those that have attacks are worth 10 XP each.',
    },
    {
      type: PARAGRAPH,
      content:
        'Some Monsters present a greater challenge than even a typical 20th-level party can handle. These Monsters have a challenge rating of 21 or higher and are specifically designed to test player skill.',
    },
  ],
};
