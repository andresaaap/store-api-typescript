import { Request, Response, Application } from "express";
import { User } from "../models/user";
import { UserStore } from "../models/user";

const store = new UserStore();

const create = async (req: Request, res: Response) => {
    let user: User = {
        id: 0,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password
    };
    try{
        const result = await store.create(user);
        res.json(result);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const getById = async (req: Request, res: Response) => {
    let id: number = Number(req.params.id);
    try{
        const result = await store.getById(id);
        res.json(result);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const authenticate = async (req: Request, res: Response) => {
    let userName: string = req.body.userName;
    let password: string = req.body.password;
    try{
        const result = await store.authenticate(userName, password);
        res.json(result);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const userRoutes = (app: Application) => {
    app.post('/users', create);
    app.get('/users/:id', getById);
    app.post('/users/authenticate', authenticate);
};

export default userRoutes;