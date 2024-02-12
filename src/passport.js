import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';

import { findByEmail, createOne as createUser, findById } from "./services/users.service.js";
import { createOne as createCart } from "./services/carts.service.js";


import { hashData, compareData } from './utils.js';
import config from './config.js'

passport.use('google', new GoogleStrategy(
    {
        clientID: config.google_client_id,
        clientSecret: config.google_client_secret,
        callbackURL: config.google_callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await findByEmail(profile._json.email)
            if(user){
                if(user.fromGoogle){
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            }
            const newCart = await createCart({ products: [] });
            const newUser = {
                first_name: profile._json.given_name,
                last_name: profile._json.family_name ? profile._json.family_name : " ",
                email: profile._json.email,
                password: ' ',
                fromGoogle: true,
                fromGithub: false, 
                cart: newCart._id
            }
            const createdUser = await createUser(newUser);
            done(null, createdUser);
        } catch (error) {
            done(error)
        }
    }
))


passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const userDB = await findByEmail(email);
        if (userDB) {
            return done(null, false)
        }
        const hashedPassword = await hashData(password);
        const newCart = await createCart({ products: [] });
        const createdUser = await createUser({ ...req.body, password: hashedPassword, cart: newCart });
        done(null, createdUser)
    } catch (error) {
        done(error)
    }
}))

passport.use('login', new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        try {
            const userDB = await findByEmail(email);
            if (!userDB) {
                return done(null, false);
            }
            const isValid = await compareData(password, userDB.password);
            if (!isValid) {
                return done(null, false);
            }
            done(null, userDB)
        } catch (error) {
            done(error)
        }
    }
))


passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findById(id)
        done(null, user)
    } catch (error) {
        done(error);
    }
})
