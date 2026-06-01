import jwt from "jsonwebtoken"


// A function for generating a Token
export const generateToken = ({ payload, secret_key, options = {} } = {}) => {
    return jwt.sign(payload, secret_key, options);
}

// A function for verifying a Token
export const verifyToken = ({ token, secret_key, options = {} } = {}) => {
    return jwt.verify(token, secret_key, options);
}