import dotenv from "dotenv";

dotenv.config()

export default {
    mongo_uri: process.env.MONGO_URI,
    google_client_id: process.env.GOOGLE_CLIENT_ID ,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.GOOGLE_callbackURL,
    session_secret: process.env.SESSION_SECRET,
    jwt_secret: process.env.JWT_SECRET,
}