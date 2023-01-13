
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task";
@Entity({name: 'tag'})
export class Tag{

    @PrimaryGeneratedColumn('uuid')
    tagId: string;

    @Column({type: "varchar"})
    name: string;

    @ManyToOne(() => Task, task => task.tags, {onDelete: "CASCADE"})
    task: Task;
}