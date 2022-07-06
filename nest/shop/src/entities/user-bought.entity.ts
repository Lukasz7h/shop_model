import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class UserBought
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar"
    })
    products_id: string;

    @Column({
        type: "varchar",
        length: 10585
    })
    comment: string;

    @ManyToOne(entity => Users, type => type.bought)
    user: Users;
};