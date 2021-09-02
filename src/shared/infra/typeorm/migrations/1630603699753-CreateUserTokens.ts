import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUserTokens1630603699753 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user_tokens',
      columns: [{
        name: 'id',
        type: 'uuid', //uuid
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      },
      {
        name: 'token',
        type: 'uuid', //uuid
        isPrimary: false,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',

      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',

      },
      ],
      foreignKeys: [{
        name: 'TokenUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }]
    })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_tokens')
  }

}
