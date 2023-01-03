import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag, Task, User } from "./task/entity/task";
import { TaskModule } from "./task/task.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'password',
            database: 'projectplanner',
            entities: [Task, Tag, User],
            synchronize: true,
            logging: true
          }),
        TaskModule
    ],
})
export class AppModule{}