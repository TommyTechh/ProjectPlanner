import { User } from "src/user_auth/entity/user";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'task'})
export class Task{
   
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({unique:true})
    title: string;
    @Column()
    description: string;
    @Column()
    image: string;
    @OneToMany(() => Tag, Tag => Tag.task, {eager: true})
    tags: Tag[]
    @Column()
    status: boolean;

    @ManyToOne(() => User, User => User.taskOwner, {eager:true})
    owner: User

    @ManyToMany(() => User, User => User.taskAssignee)
    @JoinTable({
        name: "task_assignees", // table name for the junction table of this relation
        joinColumn: {
            name: "task",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user",
            referencedColumnName: "id"
        }
    })
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