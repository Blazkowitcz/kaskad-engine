import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757928181514 implements MigrationInterface {
    name = 'Init1757928181514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`torrents\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`torrents\` ADD UNIQUE INDEX \`IDX_ea443acc3c136694645b8ef60a\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`torrents\` DROP INDEX \`IDX_ea443acc3c136694645b8ef60a\``);
        await queryRunner.query(`ALTER TABLE \`torrents\` DROP COLUMN \`name\``);
    }

}
