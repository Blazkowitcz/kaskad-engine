import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757499580499 implements MigrationInterface {
    name = 'Init1757499580499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`slug\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`subcategories\` ADD \`slug\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subcategories\` DROP COLUMN \`slug\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`slug\``);
    }

}
