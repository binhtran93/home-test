import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTournamentFixtureTable1681700156705 implements MigrationInterface {
    name = 'AddTournamentFixtureTable1681700156705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`fixture\`
            ADD \`tournamentId\` bigint UNSIGNED NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`fixture\`
            ADD CONSTRAINT \`FK_449d1f9930778da9e26ef81e60a\` FOREIGN KEY (\`tournamentId\`) REFERENCES \`tournament\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`fixture\` DROP FOREIGN KEY \`FK_449d1f9930778da9e26ef81e60a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`fixture\` DROP COLUMN \`tournamentId\`
        `);
    }

}
