import {
    findAll as findAllMsg,
    findByField as findByFieldMsg,
    createOne as createMsg
} from "../services/messages.service.js";

import {
    findAll as findAllProd,
    findById as findByIdProd,
} from "../services/products.service.js";


export const homeView = async (req, res) => {
    const user = req.user
    try {
        let ctx = {}
        if (user) {
            ctx.user = user;
            ctx.cart = user.cartInfo;
        }
        res.render('home', ctx)
    } catch (error) {
        res.status(500).json(error.message)
    }
};


export const loginView = async (req, res) => {
    if (!(req.session.messages === undefined)) {
        return res.render('login', { error: req.session.messages[0] })
    }
    res.render('login')
};

export const signupView = async (req, res) => {
    res.render('signup')
};


// CHATS VIEWS
export const allChatsView = async (req, res) => {
    const user = req.user;
    try {
        const chats = await findAllMsg();
        let ctx = { chats: chats }
        if (user) {
            ctx.user = user;
            ctx.cart = user.cartInfo;
        }
        res.render('allChats', ctx);
    } catch (error) {
        res.status(500).json(error.message)
    }
};


export const newChat = async (req, res) => {
    const { chatTitle } = req.body
    try {
        if (!chatTitle) {
            return res.status(400).json({ message: 'Some data is missing.' })
        }
        const chats = await createMsg({ chats: [], title: chatTitle })
        res.redirect('/chats')
    } catch (error) {
        res.status(500).json(error.message)
    }
};


export const chatView = async (req, res) => {
    const { cid } = req.params;
    const user = req.user;
    const chat = await findByFieldMsg({ '_id': cid });

    res.render("chat", { chat: chat._id, messages: chat.chats, user: user, cart: user.cartInfo });
};


// ------PRODUCTS VIEW
// All products
export const allProductsView = async (req, res) => {
    const user = req.user;
    try {
        const products = await findAllProd(req.query)
        products.payload.forEach(e => {
            if (e.sale) {
                e["sale_price"] = e.price - (Math.round(e.price * (e.sale_percent / 100)))
            }
        });

        let ctx = { products: products.payload, info: products }

        if(user){
            ctx.user = user;
            ctx.cart = user.cartInfo;
        }

        res.render('products_all', ctx)
    } catch (error) {
        res.status(500).json(error.message)
    }
};

// Product detail
export const productDetailsView = async (req, res) => {
    const { pid } = req.params;
    const user = req.user;
    try {
        const product = await findByIdProd(pid)
        let ctx = { product }

        if (user) {
            ctx.user = user;
            ctx.cart = user.cartInfo;
        }
        
        res.render('products_detail', ctx)
    } catch (error) {
        res.status(500).json(error.message)
    }
};

