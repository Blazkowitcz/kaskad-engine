import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1758711957878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE torrents
      MODIFY description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
      MODIFY mediainfo TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
