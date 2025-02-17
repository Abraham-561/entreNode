import "reflect-metadata"

import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { PostgresDatabase } from "./data/postgres/postgres-database";
import { envs } from "./config";

async function main() {
    const postgres = new PostgresDatabase({
        username: envs.USERNAME_DATABASE,
        password: envs.PASSWORD_DATABASE,
        host: envs.HOST_DABASE,
        database: envs.DATABASE,
        port:envs.PORT_DATABASE
    })
    await postgres.connect()


    const server =  new Server({
        port: envs.PORT,
        routes : AppRoutes.routes,
    });
    
    await server.start()
}

main()