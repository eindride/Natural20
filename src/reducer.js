export default function (state, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                authUser: action.payload,
            };
        case 'SAVE_CHARACTER_DATA_1':
            return {
                ...state,
                characterName: action.payload.characterName,
                race: action.payload.race,
                characterClass: action.payload.characterClass,
                background: action.payload.background,
                alignment: action.payload.alignment,
                level: action.payload.level,
            }
        case 'SAVE_CHARACTER_DATA_2':
            return {
                ...state,
                strengthTotal: action.payload.strengthTotal,
                dexterityTotal: action.payload.dexterityTotal,
                constitutionTotal: action.payload.constitutionTotal,
                intelligenceTotal: action.payload.intelligenceTotal,
                wisdomTotal: action.payload.wisdomTotal,
                charismaTotal: action.payload.charismaTotal,
            }
        case 'SAVE_CHARACTER_DATA_3':
            return {
                ...state,
                skills: action.payload.skills,
                weapons: action.payload.weapons,
                armor: action.payload.armor,
                weaponProficiencies: action.payload.weaponProficiencies,
                tools: action.payload.tools,
                equipment: action.payload.equipment,
            }
        default: return state;
    }
}