import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedEntities1708762378243 implements MigrationInterface {
    name = 'UpdatedEntities1708762378243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0a61a6861b5580623bb0e0b36a"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_0a61a6861b5580623bb0e0b36a" ON "user" ("credits") `);
    }

}
