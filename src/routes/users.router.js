import { Router } from "express";
import { findUsers, findUserById, findUserByEmail, deleteUser } from "../controllers/users.controller.js";

const router = Router();

router.get('/', findUsers);

// router.get('/:uid', findUserById);

router.get('/:email', findUserByEmail);

router.delete('/delete/:uid', deleteUser);

export default router;


/*
router.post('/', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'Some data is missing' });
    }
    try {
        const newCart = await cartsManager.createOne({ products: [] });
        const newUser = await usersManager.createOne({ ...req.body, cart: newCart._id })
        // res.redirect(`/home/${newUser._id}`)
        res.redirect('/')
    } catch (error) {
        res.status(500).json({ error })
    }
})
*/