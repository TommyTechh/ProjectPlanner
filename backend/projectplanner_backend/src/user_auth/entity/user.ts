import { Exclude } from "class-transformer";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../task/entity/task";


@Entity({name: 'user'})
export class User{
    @PrimaryGeneratedColumn('uuid')
    userId: string;

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