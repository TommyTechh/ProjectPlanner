import { createConnection } from "typeorm";
import { Connection } from "typeorm/connection/Connection";

export const connection = [
    {
        provide: "DATABASE_CONNECTION",
        useFactory : async (): Promise<Connection> => 
        await createConnection(require('./config/ormconfig'))
    }
]