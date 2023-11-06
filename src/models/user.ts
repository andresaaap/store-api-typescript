import client from "../database";
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds: number = Number(process.env.SALT_ROUNDS);

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}

export class UserStore {
    async create(user: User): Promise<User> {
        try{
            const hash = bcrypt.hashSync(
                user.password + pepper, 
                saltRounds
            );
            const conn = await client.connect();
            const sql = 'INSERT INTO "USER" (firstName, lastName, userName, password) VALUES($1, $2, $3, $4);';
            const result = await conn.query(sql, [user.firstName, user.lastName, user.userName, hash]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not add new user ${user.userName}. Error: ${err}`);
        }
    }

    async getById(id: number): Promise<User> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM "USER" WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error("Could find the user");
        }
    }

    async authenticate(userName: string, password: string): Promise<User | null> {
        const conn = await client.connect();
        const sql = 'SELECT password FROM "USER" WHERE userName=($1)';
        const result = await conn.query(sql, [userName]);
        conn.release();
        if(result.rows.length){
            const user = result.rows[0];
            if(bcrypt.compareSync(password + pepper, user.password)){
                return user;
            }
        }
        return null;
    }
}