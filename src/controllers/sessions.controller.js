import passport from "passport";
import { findByEmail, findById } from "../services/users.service.js";
import UsersDTO from "../DTOs/users.dto.js";

export const userOn = async (req, res) => {
        if(!req.user){
            throw new Error("You're not logged in.");
        }
        const user = await findById(req.user._id);
        const userOn = new UsersDTO(user)
        return userOn;
}

export const signup = passport.authenticate('signup',
    {
        successRedirect: '/',
        failureRedirect: '/error'
    }
)

export const login = passport.authenticate('login',
    {
        successRedirect: '/',
        failureRedirect: '/login',
        failureMessage: "Invalid credentials"
    }
)

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

export const googleAuth = passport.authenticate('google', { scope: ["profile", "email"] })

export const googleAuthCb = passport.authenticate('google', { failureRedirect: '/login' } )
