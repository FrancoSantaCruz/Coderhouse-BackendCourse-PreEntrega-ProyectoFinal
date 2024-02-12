import { userOn } from "../controllers/sessions.controller.js";

export const authValidation = (role) => {
    return async (req, res, next) => {
        try {
            const user = await userOn(req, res);
            if(user.role !== role){
                throw new Error(`Not authorized. Only for ${role}.`);
            }
            next();    
        } catch (error) {
            res.status(500).json( error.message );
        }
        
    }
}