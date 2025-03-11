const initState = {
    themeId: 1,
};

type InitStateType = typeof initState

export const themeReducer = (state: InitStateType = initState, action: ChangeThemeIdType): InitStateType => { // fix any
    switch (action.type) {
        // дописать
        case 'SET_THEME_ID':
            return {...state, themeId: action.id};
        default:
            return state;
    }
};

type ChangeThemeIdType = {
    type: 'SET_THEME_ID'
    id: number
}

export const changeThemeId = (id: number): ChangeThemeIdType => ({type: 'SET_THEME_ID', id}); // fix any
