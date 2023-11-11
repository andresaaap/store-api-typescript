import {User, UserStore} from '../models/user';

const store = new UserStore();

describe("User Model", () => {
    it('should have an create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an getById method', () => {
        expect(store.getById).toBeDefined();
    });

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
});

describe("UserStore methods", () => {
    it("create method should add a user", async () => {

        const user1: User = {
            id: 1,
            firstName: 'Mike',
            lastName: 'Jordan',
            userName: 'mike23',
            password: '6rings'
        };

        const result: User = await store.create(user1);
        // User to string contatenation of values
        const resultString = Object.values(result).join(' ');
        // Expected to string contatenation of values expect password
        const expectedString = Object.values(user1).slice(0, 4).join(' ');

        expect(resultString).toEqual(expectedString);
    });

    it("getById method should return the correct user", async () => {

        const user1: User = {
            id: 1,
            firstName: 'Mike',
            lastName: 'Jordan',
            userName: 'mike23',
            password: '6rings'
        };

        const result: User = await store.getById(user1.id);
        // User to string contatenation of values except password
        const resultString = Object.values(result).slice(0, 4).join(' ');
        // Expected to string contatenation of values except password
        const expectedString = Object.values(user1).slice(0, 4).join(' ');


        expect(resultString).toEqual(expectedString);
    });

    it("authenticate method should return the correct user", async () => {

        const user1: User = {
            id: 1,
            firstName: 'Mike',
            lastName: 'Jordan',
            userName: 'mike23',
            password: '6rings'
        };

        const result: User | null = await store.authenticate(user1.userName, user1.password);
        // User to string contatenation of values except password
        let resultString = '';
        if(result){
            resultString = Object.values(result).slice(0, 4).join(' ');
        }
        // Expected to string contatenation of values except password
        const expectedString = Object.values(user1).slice(0, 4).join(' ');
    });
});