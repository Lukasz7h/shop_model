import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class ProductsDetails
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 4500
    })
    description: string;

    @Column({
        type: "varchar",
        length: 1000,
        nullable: true
    })
    specification: string;

    @OneToOne(entity => Products, type => type.detail)
    product: Products;
}