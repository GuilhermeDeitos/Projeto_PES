import { Pool } from "pg";
import { connect } from "../db";


export class CreateTables {
    private connection: Promise<Pool> | null;

    constructor(connection: Promise<Pool>) {
        this.connection = connection;
    }

    async createAllTables(): Promise<void> {
        await this.createTableStorage();
        await this.createTableUsers();
        await this.createTableJobs();
    }

    private async init(): Promise<Pool> {
        return await connect();
    }

    private async createTableStorage(){
        if(this.connection === null) 
            this.connection =  this.init();
        
        const client = await this.connection;
        client.query(`
            CREATE TABLE IF NOT EXISTS storage (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                status INTEGER NOT NULL,
                description TEXT,
                quantity INTEGER NOT NULL,
                price FLOAT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `, (err) =>{
            if(err){
                console.log(err);
            } else {
                console.log("Table storage created");
            }
        });
    }

    private async createTableUsers(){
        if(this.connection === null)
            this.connection = this.init();

        const client = await this.connection;

        client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL,
                hours INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `, (err) => {
            if(err){
                console.log(err);
            } else {
                console.log("Table users created");
            }
        });
    }

    private async createTableJobs(){
        if(this.connection === null)
            this.connection = this.init();

        const client = await this.connection;

        client.query(`
            CREATE TABLE IF NOT EXISTS jobs (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                status INTEGER NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW(),
                progress INTEGER NOT NULL,
                workers_id INTEGER[] NOT NULL,
                value FLOAT NOT NULL
            );
        `, (err) => {
            if(err){
                console.log(err);
            } else {
                console.log("Table jobs created");
            }
        });
    }


    
}


