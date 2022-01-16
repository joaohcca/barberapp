import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAppointments1604963811158 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [{
          name: 'id',
          type: 'uuid', //uuid
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'provider',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'date',
          type: 'timestamp with time zone',
          isNullable: false,
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }

}

/**
 * Linha do Tempo
 * 1 cria agendamentos
 * 2 cria tabela de usuarios
 * (novo dev) 3 editou a tabela de agendamentos
 * 4 nova tabela: Compras
 * Migration evita que os bancos estejam atualizados de formas diferentes
 *
 * up efetua as alterações no banco de dados
 * down roolback ( se der errado algo por conta do up, o down desfaz)
 *
 */
