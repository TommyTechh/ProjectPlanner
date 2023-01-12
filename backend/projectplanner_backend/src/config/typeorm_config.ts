import { ConfigService } from "@nestjs/config";
import { config } from "dotenv"
import { Task} from "../../src/task/entity/task";
import { User } from "../../src/user_auth/entity/user";
import { DataSource } from "typeorm";
import { Tag } from "../task/entity/tag";


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
    migrations: []

});