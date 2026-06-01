import { compareSync, hashSync } from "bcrypt"
import { SALT_ROUNDS } from "../../../../config/config.service.js";

// A function for hashing any plaintext
export const hash = ({ plainText, saltRounds = Number(SALT_ROUNDS) } = {}) => {
    return hashSync(plainText, saltRounds);
};

// A function for comparing any plaintext with an already hashed string
export const compare = ({ plainText, cipherText } = {}) => {
    return compareSync(plainText, cipherText);
};