import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Debemos crear nuestra propia variable __dirname a través de este método si usamos ESM
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//bcrypt
export const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

export const isValidPassword = (user,loginPassword) => {
    return bcrypt.compareSync(loginPassword,user.password);
}

//jwt

const SECRET_KEY = "tokenSecreto";

export const generateToken = (user) =>{
    const token = jwt.sign(user,SECRET_KEY,{
        expiresIn:"1200s"
    });
    return token;
};

export const validateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.sendStatus(401);
    }
}