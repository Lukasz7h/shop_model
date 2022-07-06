import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class Basket
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
         type: "char",
         length: 36
    })
    userId: string;

    @Column({
        type: "varchar"
    })
    group: string;

    @Column({
        type: "varchar",
        length: 2
    })
    size: string;

    @ManyToOne(entity => Products, type => type.basket)
    @JoinColumn()
    product: Products;

    @Column()
    productCount: number;
};