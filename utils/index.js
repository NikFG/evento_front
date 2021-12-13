import {initializeStore, lembrar, login} from "../store";
import {setCookie} from "nookies";

const CryptoJS = require("crypto-js");

export function encrypt(object) {
    return CryptoJS.AES.encrypt(JSON.stringify(object), 'secret').toString();
}

export function decrypt(ciphertext) {
    let bytes = CryptoJS.AES.decrypt(ciphertext, 'secret');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}


export async function verificaToken(api, token = undefined, user_criptografado) {
    if (token === undefined) {
        console.log('token undefined');
        if (user_criptografado) {
            await loginAux(api, user_criptografado);
        }

    } else {
        console.log('token correto');
        const axios = require('axios');
        const isValid = await axios.post(`${api}/user/checkauth`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            return res.data.valid;
        });
        console.log({isValid, token})
        if (isValid) {
            console.log('token valid');
            const {user, roles} = await axios.get(`${api}/user/fromToken`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                return res.data;
            });
            const store = initializeStore();
            store.dispatch(login(user, roles, token));
            store.dispatch(lembrar(user_criptografado));
            setCookie(null, 'USER_TOKEN', token, {
                maxAge: 3600,
                path: '/',
                sameSite: 'strict',

            });
        } else {
            await loginAux(api, user_criptografado)
        }
    }
}

async function loginAux(api, user_criptografado, token) {
    console.log('user_criptografado');
    const {email, password} = decrypt(user_criptografado);
    const response = await api.post(`${api}/user/login`, {email, password});
    const newtoken = response.data.token;
    const user = response.data.user;
    const roles = response.data.roles;

    setCookie(null, 'USER_TOKEN', newtoken, {
        maxAge: 3600,
        path: '/',
        sameSite: 'strict',

    });
    const store = initializeStore();
    store.dispatch(login(user, roles, newtoken));
    store.dispatch(lembrar(user_criptografado));
    setCookie(null, 'USER_TOKEN', token, {
        maxAge: 3600,
        path: '/',
        sameSite: 'strict',

    });
}

