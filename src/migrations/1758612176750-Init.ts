import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1758612176750 implements MigrationInterface {
  name = 'Init1758612176750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`torrent_languages\` (
                                           \`torrent_id\` char(36) NOT NULL,
                                           \`language_id\` char(36) NOT NULL,
                                           PRIMARY KEY (\`torrent_id\`, \`language_id\`),
                                           CONSTRAINT \`FK_torrent_languages_torrent\` FOREIGN KEY (\`torrent_id\`)
                                             REFERENCES \`torrents\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                                           CONSTRAINT \`FK_torrent_languages_language\` FOREIGN KEY (\`language_id\`)
                                             REFERENCES \`languages\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`torrent_languages\``);
  }
}
