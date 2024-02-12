import { userOn } from "../controllers/sessions.controller.js";
import CartsDTO from "../DTOs/cart.dto.js";

export const cartInformation = () => {
    return async (req, res, next) => {
        try {
            if (req.user) {
                let user = await userOn(req, res);
                let cart_total = 0;

                user.cart.products.forEach((prod) => {
                    if(prod.product.sale){
                        // Precio con la oferta aplicada. 
                        prod.product.sale_price = prod.product.price - Math.round(( prod.product.sale_percent * prod.product.price ) / 100);
                        prod.subtotal = prod.product.sale_price * prod.quantity;
                    } else {
                        prod.subtotal = prod.product.price * prod.quantity;
                    }
                    
                    cart_total += prod.subtotal;
                })

                user.cart.products.cart_total = cart_total;

                // Subtotal de cada producto. 
                // Total de todos los productos.

                // Objetivo -> Rellenar el req.user con la información del cart.

                req.user.cartInfo = user.cart.products
                /*
                Estructura del req.user.cartInfo: 
                req.user.cartInfo = [
                    {
                        product: { objeto del producto completo },
                        quantity: x,
                        subtotal: x
                    },
                    {
                        product: { objeto del producto completo },
                        quantity: x,
                        subtotal: x
                    },
                    total: x,
                ]
                */
            }
            next();
        } catch (error) {
            res.status(500).json(error.message);
        }

    }
}
