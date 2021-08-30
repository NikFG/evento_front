import {getCookieStore} from 'next-persist'

const initialState = {
    // initialState goes here
    id: null,
    nome: null,
    token: null,
    email: null,
};

const persistedState = getCookieStore('userReducer', initialState);


const userReducer = (state = persistedState, action: any) => {
    switch (action.type) {
        case "login":
            return {
                ...state, ...action.payload.user
            }
            break;
        default:
            return state;
    }
};

export default userReducer;