export class TaskDto{
    title: string;
    description: string;
    image: string;
    tags: TagsDto[]
    status: boolean;
    Owner: UserDto;
    Assignees: UserDto[];
}


export class TagsDto{
    name: string;

}

export class UserDto{
    username: string;
    password: string;
    image: string;
}