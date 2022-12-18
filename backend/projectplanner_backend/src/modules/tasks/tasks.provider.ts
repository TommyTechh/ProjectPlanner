import { TaskEntity } from "src/db/model/task.entity";
import { createConnection } from "typeorm";
import { Connection } from "typeorm/connection/Connection";

export const TaskProvider = [
    {
        provide: "TASK_REPOSITORY",
        useFactory : (connection: Connection) => connection.getRepository(TaskEntity),
        Inject: ["DATABASE_CONNECTION"],
    }
]