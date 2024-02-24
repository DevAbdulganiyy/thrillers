import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedEntities1708761282200 implements MigrationInterface {
    name = 'UpdatedEntities1708761282200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "connection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer, "ttype" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "senderId" integer, "receiverId" integer, CONSTRAINT "PK_be611ce8b8cf439091c82a334b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "credits" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_0a61a6861b5580623bb0e0b36a" ON "user" ("credits") `);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_5e429a6e2dcdf5eec4a8e5b3df5" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_5c03e781592185aab953ce87a82" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_5c03e781592185aab953ce87a82"`);
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_5e429a6e2dcdf5eec4a8e5b3df5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a61a6861b5580623bb0e0b36a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "credits"`);
        await queryRunner.query(`DROP TABLE "connection"`);
    }

}
