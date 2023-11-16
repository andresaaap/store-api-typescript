import { Request, Response, Application } from "express";
import { User } from "../models/user";
import { UserStore } from "../models/user";
import jwt from 'jsonwebtoken';

const store = new UserStore();

const create = async (req: Request, res: Response) => {
    const user: User = {
        id: 0,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password
    };
    try{
        const result = await store.create(user);
        const token = jwt.sign({ user: result }, process.env.TOKEN_SECRET as string);
        res.json(token);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const getById = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
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
    const userName: string = req.body.userName;
    const password: string = req.body.password;
    try{
        const result = await store.authenticate(userName, password);
        const token = jwt.sign({ user: result }, process.env.TOKEN_SECRET as string);
        res.json(token);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const verifyAuthToken = async (req: Request, res: Response, next: Function) => {
    const authorizationHeader: string = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    try {
        const verifyAuthToken = jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    }
    catch(err) {
        res.status(401);
        res.json('Access denied, invalid token');    
    }
}


const userRoutes = (app: Application) => {
    app.post('/users', create);
    app.get('/users/:id', verifyAuthToken, getById);
    app.post('/users/authenticate', authenticate);
};

export default userRoutes;