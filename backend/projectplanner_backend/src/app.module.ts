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
            inject:[ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [Task, Tag, User],
                synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
                logging: configService.get<boolean>('DB_LOGGING')
            })
          }),
        TaskModule
    ],
})
export class AppModule{}