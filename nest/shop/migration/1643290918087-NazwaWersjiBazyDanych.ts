import {MigrationInterface, QueryRunner} from "typeorm";

export class NazwaWersjiBazyDanych1643290918087 implements MigrationInterface {
    name = 'NazwaWersjiBazyDanych1643290918087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_order_data\` ADD \`userId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users_order_data\` ADD UNIQUE INDEX \`IDX_eef16fb05020c6c1abb532c985\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`products_details\` CHANGE \`specification\` \`specification\` varchar(1000) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_2c1227b2f6e1ed0f88937c97ad8\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`detailId\` \`detailId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`basket\` DROP FOREIGN KEY \`FK_9d24569bde430378e920f27083b\``);
        await queryRunner.query(`ALTER TABLE \`basket\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`number\` \`number\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`currentToken\` \`currentToken\` varchar(255) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_eef16fb05020c6c1abb532c985\` ON \`users_order_data\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_2c1227b2f6e1ed0f88937c97ad8\` FOREIGN KEY (\`detailId\`) REFERENCES \`products_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`basket\` ADD CONSTRAINT \`FK_9d24569bde430378e920f27083b\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_order_data\` ADD CONSTRAINT \`FK_eef16fb05020c6c1abb532c9850\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_order_data\` DROP FOREIGN KEY \`FK_eef16fb05020c6c1abb532c9850\``);
        await queryRunner.query(`ALTER TABLE \`basket\` DROP FOREIGN KEY \`FK_9d24569bde430378e920f27083b\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_2c1227b2f6e1ed0f88937c97ad8\``);
        await queryRunner.query(`DROP INDEX \`REL_eef16fb05020c6c1abb532c985\` ON \`users_order_data\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`currentToken\` \`currentToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`number\` \`number\` tinyint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`basket\` CHANGE \`productId\` \`productId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`basket\` ADD CONSTRAINT \`FK_9d24569bde430378e920f27083b\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`detailId\` \`detailId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_2c1227b2f6e1ed0f88937c97ad8\` FOREIGN KEY (\`detailId\`) REFERENCES \`products_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_details\` CHANGE \`specification\` \`specification\` varchar(1000) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users_order_data\` DROP INDEX \`IDX_eef16fb05020c6c1abb532c985\``);
        await queryRunner.query(`ALTER TABLE \`users_order_data\` DROP COLUMN \`userId\``);
    }

}
