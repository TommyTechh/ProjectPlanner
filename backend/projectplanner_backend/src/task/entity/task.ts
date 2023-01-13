
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user_auth/entity/user";
import { Tag } from "./tag";

@Entity({name: 'task'})
export class Task{
   
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column({nullable: true})
    image: string;

    @OneToMany(() => Tag, Tag => Tag.task, {eager: true})
    tags: Tag[]

    @Column({default: false})
    status: boolean;

    @ManyToOne(() => User, User => User.taskOwner, {eager:true})
    owner: User


    @ManyToMany(() => User, User => User.taskAssignee, {eager:true})
    @JoinTable({
        name: "task_assignees", // table name for the junction table of this relation
        joinColumn: {
            name: "task",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user",
            referencedColumnName: "userId"
        }
    })
    assignees: User[];
}
