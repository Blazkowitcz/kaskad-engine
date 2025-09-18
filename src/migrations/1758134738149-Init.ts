import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1758134738149 implements MigrationInterface {
    name = 'Init1758134738149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`peers\` (\`id\` varchar(36) NOT NULL, \`hash\` varchar(255) NOT NULL, \`ip\` varchar(255) NOT NULL, \`port\` int NOT NULL, \`date\` datetime NOT NULL, \`userId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`peers\` ADD CONSTRAINT \`FK_1f20c3dd07f0062881468b41247\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`peers\` DROP FOREIGN KEY \`FK_1f20c3dd07f0062881468b41247\``);
        await queryRunner.query(`DROP TABLE \`peers\``);
    }

}
