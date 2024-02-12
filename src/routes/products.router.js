import { Router } from "express";
import { findProducts, findProductById, newProduct, deleteProduct, updateProduct } from '../controllers/products.controller.js'

import { authValidation } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', findProducts);

router.get('/:pid', findProductById);

router.post('/new', authValidation("admin"), newProduct);

router.put('/update/:pid', authValidation("admin"), updateProduct);

router.delete('/delete/:pid', authValidation("admin"), deleteProduct);

export default router;