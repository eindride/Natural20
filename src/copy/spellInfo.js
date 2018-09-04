const TITLE = 'title';
const SUBTITLE = 'subtitle';
const PARAGRAPH = 'paragraph';
const LIST = 'list';

export default {
  level: [
    {
      type: TITLE,
      content: 'Spell Level',
    },
    {
      type: PARAGRAPH,
      content:
        'Every spell has a level from 0 to 9. A spell’s level is a general indicator of how powerful it is, with the lowly (but still impressive) Magic Missile at 1st level and the earth--shaking wish at 9th. Cantrips—simple but powerful Spells that characters can cast almost by rote—are level 0. The higher a spell’s level, the higher level a spellcaster must be to use that spell.',
    },
    {
      type: PARAGRAPH,
      content:
        'Spell Level and character level don’t correspond directly. Typically, a character has to be at least 17th level, not 9th level, to cast a 9th--level spell.',
    },
  ],
  castingTime: [
    {
      type: TITLE,
      content: 'Casting Time',
    },
    {
      type: PARAGRAPH,
      content:
        'Most Spells require a single action to cast, but some Spells require a Bonus Action, a reaction, or much more time to cast.',
    },
    {
      type: LIST,
      content: [
        {
          title: 'Bonus Action',
          content:
            'A spell cast with a Bonus Action is especially swift. You must use a Bonus Action on Your Turn to cast the spell, provided that you haven’t already taken a Bonus Action this turn. You can’t cast another spell during the same turn, except for a cantrip with a Casting Time of 1 action.',
        },
        {
          title: 'Reactions',
          content:
            'Some Spells can be cast as reactions. These Spells take a fraction of a second to bring about and are cast in response to some event. If a spell can be cast as a reaction, the spell description tells you exactly when you can do so.',
        },
        {
          title: 'Longer Casting Times',
          content:
            'Certain Spells (including Spells cast as rituals) require more time to cast: minutes or even hours. When you Cast a Spell with a Casting Time longer than a single action or reaction, you must spend your action each turn casting the spell, and you must maintain your Concentration while you do so (see “Concentration” below). If your Concentration is broken, the spell fails, but you don’t expend a spell slot. If you want to try casting the spell again, you must start over.',
        },
      ],
    },
  ],
  schools: [
    {
      type: TITLE,
      content: 'The Schools of Magic',
    },
    {
      type: PARAGRAPH,
      content:
        'Academies of magic group Spells into eight categories called schools of magic. Scholars, particularly wizards, apply these categories to all Spells, believing that all magic functions in essentially the same way, whether it derives from rigorous study or is bestowed by a deity.',
    },
    {
      type: PARAGRAPH,
      content:
        'The schools of magic help describe spells; they have no rules of their own, although some rules refer to the schools.',
    },
    {
      type: LIST,
      content: [
        {
          title: 'Abjuration',
          content:
            'Spells are protective in Nature, though some of them have aggressive uses. They create magical barriers, negate harmful effects, harm trespassers, or banish creatures to Other Planes of existence.',
        },
        {
          title: 'Conjuration',
          content:
            'Spells involve the transportation of Objects and creatures from one location to another. Some Spells summon creatures or Objects to the caster’s side, whereas others allow the caster to Teleport to another location. Some conjurations create Objects or effects out of nothing.',
        },
        {
          title: 'Divination',
          content:
            'Spells reveal information, whether in the form of secrets long forgotten, glimpses of the future, the locations of hidden things, the truth behind illusions, or visions of distant people or places.',
        },
        {
          title: 'Enchantment',
          content:
            'Spells affect the minds of others, influencing or controlling their behavior. Such Spells can make enemies see the caster as a friend, force creatures to take a course of action, or even control another creature like a puppet.',
        },
        {
          title: 'Evocation',
          content:
            'Spells manipulate magical energy to produce a desired effect. Some call up blasts of fire or lightning. Others channel positive energy to heal wounds.',
        },
        {
          title: 'Illusion',
          content:
            'Spells deceive the Senses or minds of others. They cause people to see things that are not there, to miss things that are there, to hear phantom noises, or to remember things that never happened. Some illusions create phantom images that any creature can see, but the most insidious illusions plant an image directly in the mind of a creature.',
        },
        {
          title: 'Necromancy',
          content:
            'Spells manipulate the energies of life and death. Such Spells can grant an extra reserve of life force, drain the life energy from another creature, create the Undead, or even bring the dead back to life. Creating the Undead through the use of necromancy Spells such as Animate Dead is not a good act, and only evil casters use such Spells frequently.',
        },
        {
          title: 'Transmutation',
          content:
            'Spells change the properties of a creature, object, or Environment. They might turn an enemy into a harmless creature, bolster the Strength of an ally, make an object move at the caster’s Command, or enhance a creature’s innate Healing Abilities to rapidly recover from injury.',
        },
      ],
    },
  ],
  range: [
    {
      type: TITLE,
      content: 'Range',
    },
    {
      type: PARAGRAPH,
      content:
        'The target of a spell must be within the spell’s range. For a spell like Magic Missile, the target is a creature. For a spell like Fireball, the target is the point in space where the ball of fire erupts.',
    },
    {
      type: PARAGRAPH,
      content:
        'Most Spells have ranges expressed in feet. Some Spells can target only a creature (including you) that you touch. Other Spells, such as the Shield spell, affect only you. These Spells have a range of self.',
    },
    {
      type: PARAGRAPH,
      content:
        'Spells that create cones or lines of effect that originate from you also have a range of self, indicating that the Origin point of the spell’s effect must be you (see “Areas of Effect”).',
    },
    {
      type: PARAGRAPH,
      content:
        'Once a spell is cast, its effects aren’t limited by its range, unless the spell’s description says otherwise.',
    },
  ],
  components: [
    {
      type: TITLE,
      content: 'Components',
    },
    {
      type: PARAGRAPH,
      content:
        'A spell’s Components are the physical requirements you must meet in order to cast it. Each spell’s description indicates whether it requires verbal (V), somatic (S), or material (M) Components. If you can’t provide one or more of a spell’s Components, you are unable to cast the spell.',
    },
    {
      type: LIST,
      content: [
        {
          title: 'Verbal (V)',
          content:
            'Most Spells require the chanting of mystic words. The words themselves aren’t the source of the spell’s power; rather, the particular combination of sounds, with specific pitch and resonance, sets the threads of magic in motion. Thus, a character who is gagged or in an area of Silence, such as one created by the Silence spell, can’t Cast a Spell with a verbal component.',
        },
        {
          title: 'Somatic (S)',
          content:
            'Spellcasting gestures might include a forceful gesticulation or an intricate set of gestures. If a spell requires a somatic component, the caster must have free use of at least one hand to perform these gestures.',
        },
        {
          title: 'Material (M)',
          content:
            'Casting some Spells requires particular Objects, specified in parentheses in the component entry. A character can use a Component pouch or a Spellcasting focus (found in “Equipment”) in place of the Components specified for a spell. But if a cost is indicated for a component, a character must have that specific component before he or she can cast the spell. If a spell states that a material component is consumed by the spell, the caster must provide this component for each casting of the spell. A spellcaster must have a hand free to access a spell’s material components—or to hold a Spellcasting focus—but it can be the same hand that he or she uses to perform somatic Components.',
        },
      ],
    },
  ],
  duration: [
    {
      type: TITLE,
      content: 'Duration',
    },
    {
      type: PARAGRAPH,
      content:
        'A spell’s Duration is the length of time the spell persists. A Duration can be expressed in rounds, minutes, hours, or even years. Some Spells specify that their effects last until the Spells are dispelled or destroyed.',
    },
    {
      type: SUBTITLE,
      content: 'Instantaneous',
    },
    {
      type: PARAGRAPH,
      content:
        'Many Spells are Instantaneous. The spell harms, heals, creates, or alters a creature or an object in a way that can’t be dispelled, because its magic exists only for an instant.',
    },
    {
      type: SUBTITLE,
      content: 'Concentration',
    },
    {
      type: PARAGRAPH,
      content:
        'Some Spells require you to maintain Concentration in order to keep their magic active. If you lose Concentration, such a spell ends.',
    },
    {
      type: PARAGRAPH,
      content:
        'If a spell must be maintained with Concentration, that fact appears in its Duration entry, and the spell specifies how long you can concentrate on it. You can end Concentration at any time (no action required).',
    },
    {
      type: PARAGRAPH,
      content:
        'Normal activity, such as moving and attacking, doesn’t interfere with Concentration. The following factors can break concentration:',
    },
    {
      type: LIST,
      content: [
        {
          title: 'Casting another spell that requires Concentration.',
          content:
            'You lose Concentration on a spell if you cast another spell that requires Concentration. You can’t concentrate on two Spells at once.',
        },
        {
          title: 'Taking damage.',
          content:
            'Whenever you take damage while you are concentrating on a spell, you must make a Constitution saving throw to maintain your Concentration. The DC equals 10 or half the damage you take, whichever number is higher. If you take damage from multiple sources, such as an arrow and a dragon’s breath, you make a separate saving throw for each source of damage.',
        },
        {
          title: 'Being Incapacitated or killed.',
          content: 'You lose Concentration on a spell if you are Incapacitated or if you die.',
        },
      ],
    },
    {
      type: PARAGRAPH,
      content:
        'The GM might also decide that certain environmental phenomena, such as a wave crashing over you while you’re on a storm--tossed ship, require you to succeed on a DC 10 Constitution saving throw to maintain Concentration on a spell.',
    },
  ],
};
