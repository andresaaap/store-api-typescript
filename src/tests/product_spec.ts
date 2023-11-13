import { Product, ProductStore } from "../models/product";
import client from "../database";

const store: ProductStore = new ProductStore();

describe("Product Model", () => {
    it("should have an create method", () => {
        expect(store.create).toBeDefined();
    });
    
    it("should have an getById method", () => {
        expect(store.getById).toBeDefined();
    });
    
    it("should have an getAll method", () => {
        expect(store.getAll).toBeDefined();
    });
});

describe("ProductStore methods", () => {
    const product1: Product = {
        id: 1,
        name: "Jordan 1s",
        price: 150.00,
        category: "Basketball Shoes"
    };
    
    beforeEach(async () => {
        await store.create(product1);
    });

    afterEach(async () => {
        // Delete all of the products
        const conn = await client.connect();
        const sql = 'DELETE FROM product;';
        await conn.query(sql);
        conn.release();

        // Reset the sequence
        const conn2 = await client.connect();
        const sql2 = 'ALTER SEQUENCE product_id_seq RESTART WITH 1;';
        await conn2.query(sql2);
        conn2.release();
    });

    it("create method should add a product", async () => {

        const product2: Product = {
            id: 2,
            name: "Pippin 2",
            price: 120,
            category: "Basketball Shoes"
        };

        const result: Product = await store.create(product2);
        // Product to string contatenation of values
        let resultString = '';
        if(result){
            resultString = Object.values(result).slice(0,2).join(' ');
        }
        // Expected to string contatenation of values
        const expectedString = Object.values(product2).slice(0,2).join(" ");

        expect(resultString).toEqual(expectedString);
    });

    it("getById method should return the correct product", async () => {

        const result: Product = await store.getById(product1.id as number);

        // Product to string contatenation of values
        let resultString = '';
        if(result){
            resultString = Object.values(result).slice(0,2).join(' ');
        }
        // Expected to string contatenation of values
        const expectedString = Object.values(product1).slice(0,2).join(" ");

        expect(resultString).toEqual(expectedString);
    });

    it("getAll method should return the correct number of products", async () => {

        const result: Product[] = await store.getAll();
        const expectedLength = 1;

        expect(result.length).toEqual(expectedLength);
    });
});