import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { initialSchema1672810153327 } from "src/migrations/1672810153327-initialSchema";
import { Task, Tag, User } from "src/task/entity/task";
import { DataSource } from "typeorm";

config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [Task, Tag, User],
    logging: configService.get<boolean>('DB_LOGGING'),
    migrations: [initialSchema1672810153327]

});