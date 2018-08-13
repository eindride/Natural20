export const setLoggedInUser = (user) => (dispatch) => dispatch({ type: 'SET_USER', payload: user });

export const saveCharacterDataStage1 = (characterName, race, characterClass, background, alignment, level) => (dispatch) => dispatch({ type: 'SAVE_CHARACTER_DATA_1', payload: { characterName, race, characterClass, background, alignment, level } });

export const saveCharacterDataStage2 = (
  strengthTotal,
  dexterityTotal,
  constitutionTotal,
  intelligenceTotal,
  wisdomTotal,
  charismaTotal,
) => (dispatch) => dispatch({
  type: 'SAVE_CHARACTER_DATA_2', payload: {
    strengthTotal,
    dexterityTotal,
    constitutionTotal,
    intelligenceTotal,
    wisdomTotal,
    charismaTotal,
  }
});

export const saveCharacterDataStage3 = (
  skills,
  armor,
  weaponProficiencies,
  tools,
  weapons,
  equipment,
) => (dispatch) => dispatch({
  type: 'SAVE_CHARACTER_DATA_3', payload: {
    skills,
    armor,
    weaponProficiencies,
    tools,
    weapons,
    equipment,
  }
});
