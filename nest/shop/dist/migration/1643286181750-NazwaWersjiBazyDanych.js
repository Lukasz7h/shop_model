"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NazwaWersjiBazyDanych1643286181750 = void 0;
class NazwaWersjiBazyDanych1643286181750 {
    constructor() {
        this.name = 'NazwaWersjiBazyDanych1643286181750';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`products_details\` CHANGE \`specification\` \`specification\` varchar(1000) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`productsDetailsId\` \`productsDetailsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`number\` \`number\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`currentToken\` \`currentToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users_order_data\` DROP FOREIGN KEY \`FK_eef16fb05020c6c1abb532c9850\``);
        await queryRunner.query(`ALTER TABLE \`users_order_data\` CHANGE \`userId\` \`userId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1a769ee72c3eb53404fa0df7656\` FOREIGN KEY (\`productsDetailsId\`) REFERENCES \`products_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`basket\` ADD CONSTRAINT \`FK_9d24569bde430378e920f27083b\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_order_data\` ADD CONSTRAINT \`FK_eef16fb05020c6c1abb532c9850\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users_order_data\` DROP FOREIGN KEY \`FK_eef16fb05020c6c1abb532c9850\``);
        await queryRunner.query(`ALTER TABLE \`basket\` DROP FOREIGN KEY \`FK_9d24569bde430378e920f27083b\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1a769ee72c3eb53404fa0df7656\``);
        await queryRunner.query(`ALTER TABLE \`users_order_data\` CHANGE \`userId\` \`userId\` char(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users_order_data\` ADD CONSTRAINT \`FK_eef16fb05020c6c1abb532c9850\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`currentToken\` \`currentToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`number\` \`number\` tinyint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`productsDetailsId\` \`productsDetailsId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products_details\` CHANGE \`specification\` \`specification\` varchar(1000) NULL DEFAULT 'NULL'`);
    }
}
exports.NazwaWersjiBazyDanych1643286181750 = NazwaWersjiBazyDanych1643286181750;
//# sourceMappingURL=1643286181750-NazwaWersjiBazyDanych.js.map