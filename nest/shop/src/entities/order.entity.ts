import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

import { Users } from "./users.entity";

@Entity()
export class Order
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(entity => Products, type => type.order)
    @JoinColumn()
    product: Products;

    @ManyToOne(entity => Users, type => type.orders)
    user: Users;

    @Column()
    productCount: number;
};