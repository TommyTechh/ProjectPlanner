import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config/dist";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag, Task, User } from "./task/entity/task";
import { TaskModule } from "./task/task.module";

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
                synchronize: false, //set to .env variable if we want to generate tables application launch everytime.
                logging: configService.get<boolean>('DB_LOGGING')
            })
          }),
        TaskModule
    ],
})
export class AppModule{}