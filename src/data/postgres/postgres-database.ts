
import { DataSource } from "typeorm";
import User from "./models/user.model";
import SecurityBox from "./models/segurity-box.model";
import Pin from "./models/pin.model";


interface Options {
    host: string ;
    port: number;
    username: string;
    password: string;
    database: string;
}

export class PostgresDatabase {

    public datasource: DataSource; 
    constructor(options: Options) {
         console.log(options)
        
        this.datasource = new DataSource({
            type: "postgres",
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            entities: [User ,SecurityBox,Pin,Credential], 
            synchronize: true, 
            ssl: {
                
                rejectUnauthorized: false,
            },
        });
    }

    async connect() {
        try {
            await this.datasource.initialize(); //
            console.log("Database connected successfully!");
        } catch (error) {
            console.error("Error connecting to the database:", error);
        }
    }
}
