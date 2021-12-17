import {useMemo} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {setCookie} from "nookies";

let store;
const initialStateUser = {
    user: null,
    roles: [],
    token: null,
    user_criptografado: null,
}

export const actionTypes = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    LEMBRAR: 'LEMBRAR',
}

export const reducer = (state = initialStateUser, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                user: action.user,
                roles: action.roles,
                token: action.token,
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                roles: [],
                token: null
            }
        case actionTypes.LEMBRAR:
            return {
                ...state,
                user_criptografado: action.user_criptografado
            }
        default:
            return state
    }
}

export const login = (user, roles, token) => {
    setCookie(null, 'USER_TOKEN', token, {
        maxAge: 3600,
        sameSite: 'strict',
        secure: true,
        path: '/',
    });
    return {
        type: actionTypes.LOGIN,
        user,
        roles,
        token,
    }
}
export const logoutStore = () => {
    return {
        type: actionTypes.LOGOUT
    }
}
export const lembrar = (user_criptografado) => {
    return {
        type: 'LEMBRAR',
        user_criptografado
    }
}

const persistConfig = {
    key: 'primary',
    storage,
    whitelist: ['user', 'roles', 'token', 'user_criptografado']
}
const persistedReducer = persistReducer(persistConfig, reducer);

function makeStore(initialState = initialStateUser) {
    return createStore(
        persistedReducer,
        initialState,
        composeWithDevTools(applyMiddleware())
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? makeStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

// For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
// Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}


