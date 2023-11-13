import client from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {
    async getAll(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM product;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async getById(id: number): Promise<Product> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM product WHERE id=($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not get product ${id}. Error: ${err}`);
        }
    }

    async create(prod: Product): Promise<Product> {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO product (name, price, category) VALUES($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, [prod.name, prod.price, prod.category]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not add new product ${prod.name}. Error: ${err}`);
        }

    }

    async delete(id: number): Promise<Product> {
        try{
            const conn = await client.connect();
            const sql = 'DELETE FROM product WHERE id=($1) RETURNING *;';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}