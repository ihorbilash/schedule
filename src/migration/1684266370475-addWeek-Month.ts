import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWeekMonth1684266370475 implements MigrationInterface {
    name = 'AddWeekMonth1684266370475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`day\` ADD \`week\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`day\` ADD \`month\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`day\` DROP COLUMN \`month\``);
        await queryRunner.query(`ALTER TABLE \`day\` DROP COLUMN \`week\``);
    }

}
