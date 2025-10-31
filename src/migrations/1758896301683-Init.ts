import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1758896301683 implements MigrationInterface {
    name = 'Init1758896301683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_groups\` (\`user_id\` varchar(36) NOT NULL, \`group_id\` varchar(36) NOT NULL, INDEX \`IDX_95bf94c61795df25a515435010\` (\`user_id\`), INDEX \`IDX_4c5f2c23c34f3921fbad2cd394\` (\`group_id\`), PRIMARY KEY (\`user_id\`, \`group_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`torrents\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`torrents\` ADD \`description\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`torrents\` DROP COLUMN \`mediainfo\``);
        await queryRunner.query(`ALTER TABLE \`torrents\` ADD \`mediainfo\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_groups\` ADD CONSTRAINT \`FK_95bf94c61795df25a5154350102\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_groups\` ADD CONSTRAINT \`FK_4c5f2c23c34f3921fbad2cd3940\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_groups\` DROP FOREIGN KEY \`FK_4c5f2c23c34f3921fbad2cd3940\``);
        await queryRunner.query(`ALTER TABLE \`user_groups\` DROP FOREIGN KEY \`FK_95bf94c61795df25a5154350102\``);
        await queryRunner.query(`ALTER TABLE \`torrents\` DROP COLUMN \`mediainfo\``);
        await queryRunner.query(`ALTER TABLE \`torrents\` ADD \`mediainfo\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`torrents\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`torrents\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_4c5f2c23c34f3921fbad2cd394\` ON \`user_groups\``);
        await queryRunner.query(`DROP INDEX \`IDX_95bf94c61795df25a515435010\` ON \`user_groups\``);
        await queryRunner.query(`DROP TABLE \`user_groups\``);
    }

}
