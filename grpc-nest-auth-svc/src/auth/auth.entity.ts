import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer";

@Entity()
export class AuthEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar'})
    email !: string

    @Exclude()
    @Column({type: 'varchar'})
    password!: string;
}