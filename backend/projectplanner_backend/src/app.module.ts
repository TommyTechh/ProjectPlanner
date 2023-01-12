import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config/dist";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "./task/entity/tag";
import { Task} from "./task/entity/task";
import { TaskModule } from "./task/task.module";
import { User } from "./user_auth/entity/user";
import { UserAuthController } from "./user_auth/user_auth.controller";
import { UserAuthModule } from "./user_auth/user_auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            inject:[ConfigService],   //uses configService to access .env file so we can use secrets.
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [Task, Tag, User],
                synchronize: true, //set to false if we wanna use migrations.
                logging: configService.get<boolean>('DB_LOGGING')
            })
          }),
        TaskModule, UserAuthModule
    ],
})
export class AppModule{}