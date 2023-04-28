import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1632418208526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /**
     * queryRunner tem como funcionalidade executar ações no banco de dados
     * como criar colunas, criar tabelas, deletar dados, etc..
     * Por padrão as colunas que sao criadas com campo já são obrigatórios,
     * caso quiser informar que uma coluna de um campo não seja obrigatório
     * ai tem que especificar na coluna sua propriedade
     */
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10, // parte inteira do valor
            scale: 2, // ter duas casas decimais
          },
          {
            name: 'quantity',
            type: 'int',
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
    await queryRunner.dropTable('products');
  }
}
