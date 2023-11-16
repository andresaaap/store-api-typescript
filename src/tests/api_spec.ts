import supertest from 'supertest';
const app = require('../server').default;
import client from '../database';


const request = supertest(app);

describe('Test endpoints responses', () => {

    let token: string;

    beforeEach(async () => {
        const response = await request.post('/users').send({
            firstName: 'shaq',
            lastName: 'oneal',
            userName: 'shaq34',
            password: '4rings'
        });

        const response2 = await request.post('/users/authenticate').send({
            userName: 'shaq34',
            password: '4rings'
        });
        token = response2.body;

        const response3 = await request.post('/products').send({
            name: 'Shaqs 34s',
            price: 100.00,
            category: 'Basketball Shoes'
        });

        const response4 = await request.post('/orders').send({
            status: 'active',
            user_id: 1
        });
    });

    afterEach(async () => {

        // Delete all of the order_products 
        const conn5 = await client.connect();
        const sql5 = 'DELETE FROM order_product;';
        await conn5.query(sql5);
        conn5.release();
        
        // Delete all of the orders
        const conn6 = await client.connect();
        const sql6 = 'DELETE FROM "ORDER";';
        await conn6.query(sql6);
        conn6.release();

        // Reset the sequence
        const conn7 = await client.connect();
        const sql7 = 'ALTER SEQUENCE "ORDER_id_seq" RESTART WITH 1;';
        await conn7.query(sql7);
        conn7.release();

        // Delete all of the users
        const conn = await client.connect();
        const sql = 'DELETE FROM "USER";';
        await conn.query(sql);
        conn.release();

        // Reset the sequence
        const conn2 = await client.connect();
        const sql2 = 'ALTER SEQUENCE "USER_id_seq" RESTART WITH 1;';
        await conn2.query(sql2);
        conn2.release();

        // Delete all of the products
        const conn3 = await client.connect();
        const sql3 = 'DELETE FROM product;';
        await conn3.query(sql3);
        conn3.release();

        // Reset the sequence
        const conn4 = await client.connect();
        const sql4 = 'ALTER SEQUENCE product_id_seq RESTART WITH 1;';
        await conn4.query(sql4);
        conn4.release();
    });
    
    it('post /users create user - good user input - user created in db', async () => {
        const response = await request.post('/users').send({
            firstName: 'Mike',
            lastName: 'Jordan',
            userName: 'mike23',
            password: '6rings'
        });
        expect(response.status).toBe(200);
    });

    it('get /users/authenticate authenticate user - good user input - user authenticated', async () => {
        const response = await request.post('/users/authenticate').send({
            userName: 'shaq34',
            password: '4rings'
        });
        expect(response.status).toBe(200);
    });

    it('get /users/:id get user by id - good user input - user returned', async () => {
        
        const response2 = await request.get('/users/1').set('Authorization', 'Bearer ' + token);
        expect(response2.status).toBe(200);
    });

    it('post /products create product - good product input - product created in db', async () => {
        const response = await request.post('/products').send({
            name: 'Jordan 1s',
            price: 150.00,
            category: 'Basketball Shoes'
        });
        expect(response.status).toBe(200);
    });

    it('get /products get all products - database with correct information - products returned', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });

    it('get /products/:id get product by id - good product input - product returned', async () => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
    });

    it('create order - good order input - order created in db', async () => {
        const response = await request.post('/orders').send({
            status: 'active',
            user_id: 1
        });
        expect(response.status).toBe(200);
    });

    it('get /orders get all orders - database with correct information - orders returned', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(200);
    });

    it('get /orders/:id get order by id - good order input - order returned', async () => {
        const response = await request.get('/orders/1');
        expect(response.status).toBe(200);
    });

    it('get /orders/users/:user_id/completed get completed orders by user id - good user input - orders returned', async () => {
        const response = await request.get('/orders/users/1/completed');
        expect(response.status).toBe(200);
    });

    it('get /orders/users/:user_id/active get active orders by user id - good user input - orders returned', async () => {
        const response = await request.get('/orders/users/1/active');
        expect(response.status).toBe(200);
    });

    it('put /orders/:id update order - good order input - order updated in db', async () => {
        const response = await request.put('/orders/1').send({
            status: 'completed',
            user_id: 1
        });
        expect(response.status).toBe(200);
    });

    it('post /orders/:id/products add product to order - good order input - product added to order', async () => {
        const response = await request.post('/orders/1/products').send({
            product_id: 1,
            quantity: 2
        });
        expect(response.status).toBe(200);
    });


});


