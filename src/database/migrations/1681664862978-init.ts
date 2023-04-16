import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1681664862978 implements MigrationInterface {
    name = 'Init1681664862978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`team\` (
                \`id\` bigint UNSIGNED NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_cf461f5b40cf1a2b8876011e1e\` (\`name\`),
                INDEX \`IDX_2cc4c76495121fb01694252386\` (\`createdAt\`),
                INDEX \`IDX_2385186738826cbcd6fda6ecd6\` (\`updatedAt\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`tournament\` (
                \`id\` bigint UNSIGNED NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_39c996e461f5fe152d4811f9e5\` (\`name\`),
                INDEX \`IDX_09ef19d3c8210acb6cc486b19d\` (\`createdAt\`),
                INDEX \`IDX_063ac52bc8ef13e15648470d87\` (\`updatedAt\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`fixture\` (
                \`id\` bigint UNSIGNED NOT NULL,
                \`homeTeamId\` bigint UNSIGNED NOT NULL,
                \`awayTeamId\` bigint UNSIGNED NOT NULL,
                \`homeTeamScore\` bigint UNSIGNED NULL,
                \`awayTeamScore\` bigint UNSIGNED NULL,
                \`state\` varchar(50) NOT NULL,
                \`date\` timestamp NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_82f360d6fa749d4e7c400cf0ab\` (\`date\`),
                INDEX \`IDX_67a8aac17b2515a4b781461319\` (\`createdAt\`),
                INDEX \`IDX_f61f361e990396f69f29053c90\` (\`updatedAt\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`fixture\`
            ADD CONSTRAINT \`FK_abbb9dc0c9aca6312eee7d54ad7\` FOREIGN KEY (\`homeTeamId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`fixture\`
            ADD CONSTRAINT \`FK_6abf61842adc90eb78ccbdbfe01\` FOREIGN KEY (\`awayTeamId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`fixture\` DROP FOREIGN KEY \`FK_6abf61842adc90eb78ccbdbfe01\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`fixture\` DROP FOREIGN KEY \`FK_abbb9dc0c9aca6312eee7d54ad7\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_f61f361e990396f69f29053c90\` ON \`fixture\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_67a8aac17b2515a4b781461319\` ON \`fixture\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_82f360d6fa749d4e7c400cf0ab\` ON \`fixture\`
        `);
        await queryRunner.query(`
            DROP TABLE \`fixture\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_063ac52bc8ef13e15648470d87\` ON \`tournament\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_09ef19d3c8210acb6cc486b19d\` ON \`tournament\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_39c996e461f5fe152d4811f9e5\` ON \`tournament\`
        `);
        await queryRunner.query(`
            DROP TABLE \`tournament\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_2385186738826cbcd6fda6ecd6\` ON \`team\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_2cc4c76495121fb01694252386\` ON \`team\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_cf461f5b40cf1a2b8876011e1e\` ON \`team\`
        `);
        await queryRunner.query(`
            DROP TABLE \`team\`
        `);
    }

}
