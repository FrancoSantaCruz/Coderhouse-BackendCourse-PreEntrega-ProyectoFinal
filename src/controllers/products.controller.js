import { findAll, findById, createOne, deleteOne, updateOne } from '../services/products.service.js'


export const findProducts = async (req, res) => {
    try {
        const products = await findAll(req.query);
        res.status(200).json({ message: 'Products founded', products })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const findProductById = async (req, res) => {
    const { pid } = req.params
    try {
        const product = await findById(pid)
        if(!product){
            return res.status(400).json({ message: 'Product doesnt exists' })
        }
        res.status(200).json({ message: 'Product found', product })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const newProduct = async (req, res) => {
    const { title, description, price, status, stock, category, sale, sale_percent } = req.body
    if (!title || !description || !price || !stock || !category) {
        return res.status(400).json({ message: 'Some data is missing' });
    }
    try {

        // code generator
        let rdm_code = ""
        let random = 0
        for(let i=0 ; i<5 ; i++){
            random = Math.floor(Math.random() * title.length)
            rdm_code = rdm_code.concat(random)
        }

        const prod = {
            title: title,
            description: description,
            code: rdm_code,
            price: price,
            status: status? "false" : "true",
            stock: stock,
            category: category,
            sale: sale? "true" : "false",
            sale_percent : sale_percent ? sale_percent : 0,
        }
        const product = await createOne(prod)
        res.status(200).json({ message: 'Product created', product })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await deleteOne(pid)
        res.status(200).json({ message: 'Product deleted', product })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const updateProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const modifyProduct = await updateOne(pid, req.body);
        res.status(200).json({message: "Product has been modified.", modifyProduct});
    } catch (error) {
        res.status(500).json( error.message )
    }
}
