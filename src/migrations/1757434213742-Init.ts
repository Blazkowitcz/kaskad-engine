import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1757434213742 implements MigrationInterface {
  name = 'Init1757434213742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`users\`
      (
        \`id\`
        varchar
       (
        36
       ) NOT NULL, \`username\` varchar
       (
         255
       ) NOT NULL, \`password\` varchar
       (
         255
       ) NOT NULL, \`email\` varchar
       (
         255
       ) NOT NULL, \`passkey\` varchar
       (
         255
       ) NOT NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\`
       (
         \`username\`
       ), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\`
       (
         \`email\`
       ), PRIMARY KEY
       (
         \`id\`
       )) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`torrents\`
      (
        \`id\`
        varchar
       (
        36
       ) NOT NULL, \`slug\` varchar
       (
         255
       ) NOT NULL, \`filename\` varchar
       (
         255
       ) NOT NULL, \`description\` longtext NOT NULL, \`mediainfo\` longtext NOT NULL, \`hash\` varchar
       (
         255
       ) NOT NULL, \`size\` int NOT NULL, \`completed\` int NOT NULL, \`validated\` tinyint NOT NULL, \`blocked\` tinyint NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, \`userId\` varchar
       (
         36
       ) NOT NULL, UNIQUE INDEX \`IDX_be89691ef08d03751781fec46c\`
       (
         \`slug\`
       ), PRIMARY KEY
       (
         \`id\`
       )) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`torrents\`
        ADD CONSTRAINT \`FK_f14b01737c35a4a1015bbbe5c1f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`id\`) ON
          DELETE
          NO ACTION ON
          UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`torrents\` DROP FOREIGN KEY \`FK_f14b01737c35a4a1015bbbe5c1f\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_be89691ef08d03751781fec46c\` ON \`torrents\``,
    );
    await queryRunner.query(`DROP TABLE \`torrents\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
