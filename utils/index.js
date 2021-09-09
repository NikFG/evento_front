const CryptoJS = require("crypto-js");

export function encrypt(object) {
    return CryptoJS.AES.encrypt(JSON.stringify(object), 'secret').toString();
}

export function decrypt(ciphertext) {
    let bytes = CryptoJS.AES.decrypt(ciphertext, 'secret');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

