import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1758612176745 implements MigrationInterface {
  name = 'Init1758612176745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`languages\`
        (
            \`id\`
            varchar
                                 (
            36
                                 ) NOT NULL,
            \`name\` varchar
                                 (
                                     255
                                 ) NOT NULL,
            \`slug\` varchar
                                 (
                                     255
                                 ) NOT NULL,
            PRIMARY KEY
                                 (
                                     \`id\`
                                 )
            ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`languages\``);
  }
}
