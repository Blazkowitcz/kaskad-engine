import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757446253648 implements MigrationInterface {
    name = 'Init1757446253648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`torrents\` ADD \`subcategoryId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`torrents\` ADD CONSTRAINT \`FK_642fac6fb53529bdfe3626856df\` FOREIGN KEY (\`subcategoryId\`) REFERENCES \`subcategories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`torrents\` DROP FOREIGN KEY \`FK_642fac6fb53529bdfe3626856df\``);
        await queryRunner.query(`ALTER TABLE \`torrents\` DROP COLUMN \`subcategoryId\``);
    }

}
