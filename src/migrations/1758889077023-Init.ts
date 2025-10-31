import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1758889077023 implements MigrationInterface {
    name = 'Init1758889077023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`groups\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, \`isModerator\` tinyint NOT NULL DEFAULT 0, \`isAdministrator\` tinyint NOT NULL DEFAULT 0, \`isTrusted\` tinyint NOT NULL DEFAULT 0, \`isFreeleech\` tinyint NOT NULL DEFAULT 0, \`canDownload\` tinyint NOT NULL DEFAULT 0, \`canUpload\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`groups\``);
    }

}
