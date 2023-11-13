import {Order, OrderStore} from '../models/order';
import client from '../database';
import { Product, ProductStore } from '../models/product';
import { User, UserStore } from '../models/user';

const store: OrderStore = new OrderStore();
const productStore: ProductStore = new ProductStore();
const userStore: UserStore = new UserStore();

describe("Order Model", () => {
    it('should have an create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an getById method', () => {
        expect(store.getById).toBeDefined();
    });

    it('should have an getAll method', () => {
        expect(store.getAll).toBeDefined();
    });

    it('should have an getCompletedByUserId method', () => {
        expect(store.getCompletedByUserId).toBeDefined();
    });

    it('should have an getActiveByUserId method', () => {
        expect(store.getActiveByUserId).toBeDefined();
    });

    it('should have an addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });

    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });

});

describe("OrderStore methods", () => {
    const product1: Product = {
        id: 1,
        name: "Jordan 1s",
        price: 150.00,
        category: "Basketball Shoes"
    };
    
    const user1: User = {
        id: 1,
        firstName: 'Mike',
        lastName: 'Jordan',
        userName: 'mike23',
        password: '6rings'
    };
    let order1: Order = {
        id: 1,
        status: 'active',
        user_id: 1
    };

    beforeEach(async () => {
        order1.status = 'active';
        await productStore.create(product1);
        await userStore.create(user1);

        await store.create(order1);
        await store.addProduct(order1.id, product1.id as number, 1);
        
    });

    afterEach(async () => {

        // Delete all of the order_products 
        const conn7 = await client.connect();
        const sql7 = 'DELETE FROM order_product;';
        await conn7.query(sql7);
        conn7.release();
        
        // Delete all of the orders
        const conn = await client.connect();
        const sql = 'DELETE FROM "ORDER";';
        await conn.query(sql);
        conn.release();

        // Reset the sequence
        const conn2 = await client.connect();
        const sql2 = 'ALTER SEQUENCE "ORDER_id_seq" RESTART WITH 1;';
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

        // Delete all of the users
        const conn5 = await client.connect();
        const sql5 = 'DELETE FROM "USER";';
        await conn5.query(sql5);
        conn5.release();

        // Reset the sequence
        const conn6 = await client.connect();
        const sql6 = 'ALTER SEQUENCE "USER_id_seq" RESTART WITH 1;';
        await conn6.query(sql6);
        conn6.release();
        
    });

    it("getAll method should return a list of orders", async () => {

        const result: Order[] = await store.getAll();

        expect(result.length).toEqual(1);
    });

    it("getById method should return the correct order", async () => {

        const result: Order = await store.getById(order1.id as number);

        // Order to string contatenation of values
        const resultString = Object.values(result).join(' ');
        // Expected to string contatenation of values
        const expectedString = Object.values(order1).join(' ');

        expect(resultString).toEqual(expectedString);
    });

    it("getCompletedByUserId method should return the correct order", async () => {
            
        const result: Order[] = await store.getCompletedByUserId(user1.id as number);

        expect(result.length).toEqual(0);
    });

    it("getActiveByUserId method should return the correct order", async () => {
            
        const result: Order[] = await store.getActiveByUserId(user1.id as number);

        expect(result.length).toEqual(1);
    });

    it("create method should add a order", async () => {
            
            const order2: Order = {
                id: 2,
                status: 'active',
                user_id: 1
            };
    
            const result: Order = await store.create(order2);
            // Order to string contatenation of values
            const resultString = Object.values(result).join(' ');
            // Expected to string contatenation of values
            const expectedString = Object.values(order2).join(' ');
    
            expect(resultString).toEqual(expectedString);
        }
    );

    it("update method should update the order", async () => {
            order1 = {
                id: 1,
                status: 'complete',
                user_id: 1
            };
    
            const result: Order = await store.update(order1);
            // Order to string contatenation of values
            const resultString = Object.values(result).join(' ');
            // Expected to string contatenation of values
            const expectedString = Object.values(order1).join(' ');
    
            expect(resultString).toEqual(expectedString);
        }
    );

    it("addProduct method should add a product to the order", async () => {
            const product2: Product = {
                id: 2,
                name: "Pippin 2",
                price: 120,
                category: "Basketball Shoes"
            };
            await productStore.create(product2);

            const result: boolean = await store.addProduct(order1.id, product2.id as number, 1);
    
            expect(result).toEqual(true);
        }
    );


});
