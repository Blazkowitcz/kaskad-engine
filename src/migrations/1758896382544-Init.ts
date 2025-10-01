import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1758896382544 implements MigrationInterface {
    name = 'Init1758896382544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_groups\` ADD CONSTRAINT \`FK_95bf94c61795df25a5154350102\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_groups\` ADD CONSTRAINT \`FK_4c5f2c23c34f3921fbad2cd3940\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_groups\` DROP FOREIGN KEY \`FK_4c5f2c23c34f3921fbad2cd3940\``);
        await queryRunner.query(`ALTER TABLE \`user_groups\` DROP FOREIGN KEY \`FK_95bf94c61795df25a5154350102\``);
    }

}
