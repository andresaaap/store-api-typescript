import { Request, Response, Application } from "express";
import { Order } from "../models/order";
import { OrderStore } from "../models/order";

const store = new OrderStore();

const getAll = async (req: Request, res: Response) => {
    try {
    const orders = await store.getAll();
    res.json(orders);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const getById = async (req: Request, res: Response) => {
    try{
    const order = await store.getById(parseInt(req.params.id));
    res.json(order);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const getCompletedByUserId = async (req: Request, res: Response) => {
    try{
    const order = await store.getCompletedByUserId(parseInt(req.params.user_id));
    res.json(order);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const getActiveByUserId = async (req: Request, res: Response) => {
    try{
    const order = await store.getActiveByUserId(parseInt(req.params.user_id));
    res.json(order);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        id: 0,
        status: req.body.status,
        user_id: req.body.user_id
    }

    try{
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const update = async (req: Request, res: Response) => {
    const order: Order = {
        id: parseInt(req.params.id),
        status: req.body.status,
        user_id: req.body.user_id
    }

    try{
        const updatedOrder = await store.update(order);
        res.json(updatedOrder);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const addProduct = async (req: Request, res: Response) => {
    try{
        const orderId = parseInt(req.params.id);
        const productId = parseInt(req.body.product_id);
        const quantity = parseInt(req.body.quantity);
        const addedProduct = await store.addProduct(orderId, productId, quantity);
        res.json(addedProduct);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const orderRoutes = (app: Application) => {
    app.get('/orders', getAll);
    app.get('/orders/:id', getById);
    app.get('/orders/users/:user_id/completed', getCompletedByUserId);
    app.get('/orders/users/:user_id/active', getActiveByUserId);
    app.post('/orders', create);
    app.put('/orders/:id', update);
    app.post('/orders/:id/products', addProduct);
}

export default orderRoutes;