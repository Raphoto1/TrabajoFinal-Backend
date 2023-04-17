import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

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