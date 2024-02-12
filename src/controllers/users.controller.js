import { findAll, findById, findByEmail, deleteOne } from "../services/users.service.js";


export const findUsers = async (req, res) => {
    try {
        const allUsers = await findAll();
        res.status(200).json({ message: ' All users ', allUsers })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const findUserById = async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await findById(uid);
        res.status(200).json({ message: ' User found ', user })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const findUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await findByEmail(email);
        if(!user){
            return res.status(404).json({ message: ' User doesnt exists or invalid email '})
        }
        res.status(200).json({ message: ' User found ', user })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        const deletedUser = await deleteOne(uid);
        res.status(200).json({ message: ' User removed. ', deletedUser })
    } catch (error) {
        res.status(500).json({ error })
    }
};