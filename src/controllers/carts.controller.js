import { Router } from "express";

import {
    findById as findByIdCart,
    createOne as createOneCart,
    updateOne as updateOneCart
} from "../services/carts.service.js";

import { 
    findById as findByIdProd,
    updateOne as updateProd
} from "../services/products.service.js";

import {
    create as createTicket
} from "../services/tickets.service.js";

const router = Router();


export const findCart = async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await findByIdCart(cid)
        res.status(200).json({ message: 'Cart found', cart })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const newCart = async (req, res) => {
    try {
        const cart = { products: [] }
        const newCart = await createOneCart(cart)
        res.status(200).json({ message: ' New cart', cart: newCart })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const addProdToCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await findByIdCart(cid)
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }
        const product = await findByIdProd(pid);
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }
        const prod_idx = cart.products.findIndex((prod) => prod.product._id.equals(pid));
        // Como prod.product son tipo de datos ObjectId de mongoose
        // necesitamos usar .equals() para comparar con otro tipo de dato
        if (prod_idx === -1) {
            cart.products.push({ product: pid, quantity: 1 })
        } else {
            cart.products[prod_idx].quantity++
        }

        await updateOneCart(cid, cart)

        res.status(200).redirect('back')
        // res.status(200).json({message: 'Product added.', cart})
    } catch (error) {
        res.status(500).json( error.message )
    };
};

export const removeProdFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {

        const cart = await findByIdCart(cid);
        if (!cart) return res.status(400).json({ message: 'Cart not found' });

        const product = await findByIdProd(pid);
        if (!product) return res.status(400).json({ message: 'Product not found' });

        const idx = cart.products.findIndex((p) => p.product._id.equals(pid));
        if (idx === -1) {
            throw new Error("This product is not in your cart.")
        } else {
            cart.products[idx].quantity--
            if(cart.products[idx].quantity <= 0){
                cart.products.splice(idx, 1);
            }
            await updateOneCart(cid, cart)
        }
        res.status(200).redirect('back');
    } catch (error) {
        res.status(500).json( error.message )
    };
};

export const clearCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await findByIdCart(cid)
        cart.products = []
        const emptyCart = await updateOneCart(cid, cart);
        res.status(200).redirect('back');
    } catch (error) {
        res.status(500).json( error.message )
    }
}

export const buyCart = async (req, res) => {
    const { cid } = req.params;
    const user = req.user;
    try {
        const cart = user.cartInfo;
        let cart_total = 0;
        let cart_aux = [];

        if(!cart) throw new Error("Cart doesn't exists.");
        if(!user) return res.redirect('/login');
        
        for(let i=0; i<cart.length ; i++){
            let prodDB = await findByIdProd(cart[i].product._id);
            
            if(prodDB.stock >= cart[i].quantity){
                prodDB.stock = prodDB.stock - cart[i].quantity;
                if(prodDB.stock == 0) prodDB.status = false
                await updateProd(prodDB._id, prodDB);
                
                cart_total += cart[i].subtotal;
            } else {
                cart_aux.push(cart[i])
            }
        }

        const cartDB = await findByIdCart(user.cart._id);
        cartDB.products = cart_aux;
        await updateOneCart(user.cart._id, cartDB);

        const ticket = await createTicket(cart_total, user.email);
        res.status(200).json( {message: "Bought complete!", "Unprocessed Products": cart_aux  ,ticket} );
    } catch (error) {
        res.status(500).json( error.message )
    }
}


export default router;