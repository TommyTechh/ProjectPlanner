import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'task'})
export class Task{
   
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    image: string;
    @OneToMany(() => Tag, Tag => Tag.task, {cascade: true, eager: true})
    tags: Tag[]
    @Column()
    status: boolean;
    @OneToMany(() => User, User => User.task, {cascade: true, eager: true})
    assignees: User[];
}

@Entity({name: 'tag'})
export class Tag{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: "varchar"})
    name: string;

    @ManyToOne(() => Task, task => task.tags)
    task: Task;
}

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