import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Basket } from "./basket.entity";

import { Order } from "./order.entity";
import { ProductsDetails } from "./products-details.entity";

@Entity()
export class Products
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 120
    })
    name: string;

    @Column({
        type: "varchar",
        length: 6
    })
    season: string;

    @Column({
        type: "varchar",
        length: 6
    })
    bodyPart: string;

    @Column({
        type: "varchar"
    })
    type: string;

    @Column({
        type: "float"
    })
    price: number;

    @Column({
        type: "varchar",
        length: 1480,
        nullable: true
    })
    photosName: string | null;

    @Column({
        type: "float",
        nullable: true
    })
    review: number;

    @Column({
        type: "integer",
        unsigned: true
    })
    reviewAmount: number;

    @OneToOne(entity => ProductsDetails, type => type.product)
    @JoinColumn()
    detail: ProductsDetails;

    @OneToMany(entity => Basket, type => type.product)
    basket: Basket;

    @OneToMany(entity => Order, type => type.product)
    order: Basket;
};