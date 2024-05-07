import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Reservation } from "./Reservation";
import {LocationDTO} from "../../../models";

@Entity()
export class Location implements LocationDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    active: boolean;

    @OneToMany(type => Reservation, reservation => reservation.location)
    reservation: Reservation[];
}
