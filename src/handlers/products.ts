import { ProductStore, Product } from "../models/product";
import { Request, Response, Application } from "express";

const productStore = new ProductStore();

const getAll = async (_req: Request, res: Response) => {
    try{
    const products: Product[] = await productStore.getAll();
    res.json(products);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
};

const getById = async (req: Request, res: Response) => {
    try{
    const product: Product = await productStore.getById(Number(req.params.id));
    res.json(product);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };

    try{
        const newProduct = await productStore.create(product);
        res.json(newProduct);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
};

const productRoutes = (app: Application) => {
    app.get('/products', getAll);
    app.get('/products/:id', getById);
    app.post('/products', create);
};

export default productRoutes;