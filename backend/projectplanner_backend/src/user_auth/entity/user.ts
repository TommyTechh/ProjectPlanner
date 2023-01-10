import { Exclude } from "class-transformer";
import { Task } from "src/task/entity/task";
import { TaskModule } from "src/task/task.module";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'user'})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    username: string;
    @Exclude()
    @Column()
    password: string;
    @Column({nullable: true})
    avatar: string;
    @OneToMany(() => Task, task => task.owner)
    taskOwner: Task[];
    @ManyToMany(() => Task, task => task.assignees)
    taskAssignee: Task[];
}