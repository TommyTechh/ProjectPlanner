/*import { identity } from "rxjs"
import { Task } from "src/task/entity/task"
import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class initialSchema1672810153327 implements MigrationInterface {

    //creates tables with specified columns.
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'task',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    }
                    
                ]

            })
        )
        await queryRunner.createTable(
            new Table({
                name:'user',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        isNullable: false,
                    }
                ]
            })
        )

        await queryRunner.createTable(
            new Table ({
                name: 'tag',
                columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                }
            ]
            }
        )
    )
    //adds foreign key to tag table and references task table using typeorm.
    await queryRunner.addColumn('tag',
    new TableColumn({
        name: 'taskId',
        type: 'uuid'
    }))

    await queryRunner.createForeignKey('tag',
    new TableForeignKey({
        columnNames: ['taskId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'task',
        onDelete: 'CASCADE'
    }))
}

    public async down(queryRunner: QueryRunner): Promise<void> {
    }



}
*/
