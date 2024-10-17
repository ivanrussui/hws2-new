import {UserType} from '../HW8';

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => {
    switch (action.type) {
        case 'sort': { // by name
            // ниже варианты с localeCompare и без, предпочтительней с localeCompare
            return [...state].sort((a, b) => {
                return action.payload === 'up'
                    ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            });

            // return [...state].sort((a, b) => {
            //     return action.payload === 'up'
            //         ? a.name > b.name ? 1 : -1 : a.name < b.name ? 1 : -1;
            // });
        }
        case 'check': {
            return state.filter(el => el.age >= action.payload);
        }
        default:
            return state;
    }
};
