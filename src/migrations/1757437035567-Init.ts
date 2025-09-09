import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1757437035567 implements MigrationInterface {
  name = 'Init1757437035567';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`subcategories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, \`categoryId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subcategories\` ADD CONSTRAINT \`FK_d1fe096726c3c5b8a500950e448\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`subcategories\` DROP FOREIGN KEY \`FK_d1fe096726c3c5b8a500950e448\``,
    );
    await queryRunner.query(`DROP TABLE \`subcategories\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
