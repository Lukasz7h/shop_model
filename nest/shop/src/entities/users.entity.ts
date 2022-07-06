import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

import { UserBought } from "./user-bought.entity";
import { UsersOrderData } from "./users-order-data.entity";

@Entity()
export class Users
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar"
    })
    login: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    email: string;

    @Column({
        type: "tinyint",
        nullable: true
    })
    number: number;

    @Column({
        type: "varchar"
    })
    password: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    currentToken: string;

    @Column({
        type: "bool"
    })
    isAdmin: boolean;

    @OneToOne(entity => UsersOrderData, type => type.user)
    orderData: UsersOrderData;

    @OneToMany(entity => Order, type => type.user)
    orders: Order[];

    @OneToMany(entity => UserBought, type => type.user)
    bought: UserBought[];
}