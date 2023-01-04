import { Task } from "src/task/entity/task";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'user'})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    image: string;
    @ManyToOne(() => Task, task => task.assignees)
    task: Task;
}