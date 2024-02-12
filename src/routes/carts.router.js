import { Router } from "express";
import { findCart, newCart, addProdToCart, removeProdFromCart, buyCart, clearCart } from "../controllers/carts.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/:cid', findCart);

router.post('/', newCart);

router.post('/clear/:cid', clearCart);

// Add one product to cart.
router.post('/add/:cid/products/:pid', authValidation("user"),  addProdToCart);

// Remove one product from cart.
router.put('/update/:cid/products/:pid', authValidation("user"), removeProdFromCart);

// Buy cart
router.post('/:cid/purchase', authValidation("user"), buyCart);


export default router;