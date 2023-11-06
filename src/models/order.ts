import client from "../database";

export type Order = {
    id: number;
    status: string;
    user_id: number;
}

export class OrderStore {
    async getAll(): Promise<Order[]> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM "ORDER"';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async getById(id: number): Promise<Order> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM "ORDER" WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not get order ${id}. Error: ${err}`);
        }
    }

    async getCompletedByUserId(user_id: number): Promise<Order> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM "ORDER" WHERE user_id=($1) and status=($2)';
            const result = await conn.query(sql, [user_id, 'complete']);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not get order ${user_id}. Error: ${err}`);
        }
    }

    async getActiveByUserId(user_id: number): Promise<Order> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM "ORDER" WHERE user_id=($1) and status=($2)';
            const result = await conn.query(sql, [user_id, 'active']);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not get order ${user_id}. Error: ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO "ORDER" (status, user_id) VALUES($1, $2)';
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }

    async update(o: Order): Promise<Order> {
        try{
            const conn = await client.connect();
            const sql = 'UPDATE "ORDER" SET status=($1), user_id=($2) WHERE id=($3)';
            const result = await conn.query(sql, [o.status, o.user_id, o.id]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not update order ${o.id}. Error: ${err}`);
        }
    }

    async addProduct(order_id: number, product_id: number, quantity: number,): Promise<Order> {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO order_product (quantity, order_id, product_id) VALUES($1, $2, $3)';
            const result = await conn.query(sql, [quantity, order_id, product_id]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not add product to order ${order_id}. Error: ${err}`);
        }
    }
}

