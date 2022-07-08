import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1657318274153 implements MigrationInterface {
    name = 'Base1657318274153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "keyboards" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "switches" character varying NOT NULL, "keycaps" character varying NOT NULL, "sound_test_url" character varying, "created_at" integer NOT NULL, "updated_at" integer, CONSTRAINT "PK_10a6bb1e0566df9a8769dc02414" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "created_at" integer NOT NULL, "updated_at" integer, "user_id" integer, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "twitter_id" character varying NOT NULL, "twitter_username" character varying NOT NULL, "twitter_image_url" character varying NOT NULL, "created_at" integer NOT NULL, "updated_at" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "image_name" character varying NOT NULL, "keyboard_id" integer NOT NULL, "creator_id" integer NOT NULL, "created_at" integer NOT NULL, "updated_at" integer, CONSTRAINT "REL_24197fbe1eaada2653c3e5484c" UNIQUE ("keyboard_id"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_24197fbe1eaada2653c3e5484c9" FOREIGN KEY ("keyboard_id") REFERENCES "keyboards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c810f0ccb5f80b289391454d4ad" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c810f0ccb5f80b289391454d4ad"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_24197fbe1eaada2653c3e5484c9"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "keyboards"`);
    }

}
