import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class UsersOrderData
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    city: string;

    @Column()
    post_code: string;

    @Column()
    street: string;

    @Column()
    house_number: number;

    @Column()
    apartment_number: number;

    @Column()
    phone: number;

    @Column()
    email: string;

    @Column()
    paymant: string;

    @OneToOne(entity => Users, type => type.orderData)
    @JoinColumn()
    user: Users;
};