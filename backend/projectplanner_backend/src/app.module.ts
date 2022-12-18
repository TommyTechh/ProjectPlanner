import { Module } from "@nestjs/common";
import { DatabaseModule } from "./db/database.module";
import { TaskModule } from "./modules/tasks/tasks.module";

@Module({
    imports: [
        DatabaseModule, TaskModule
    ],
})
export class AppModule{}