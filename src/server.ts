import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './handlers/users'
import orderRoutes from './handlers/orders'
import productRoutes from './handlers/products'
import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express()
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000
const address: string = 'localhost'

app.use(bodyParser.json())

userRoutes(app);
orderRoutes(app);
productRoutes(app);

app.listen(port, function () {
    console.log(`starting app on: ${address}:${port}`)
})

export default app;
