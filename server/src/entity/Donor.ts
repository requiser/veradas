import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Reservation } from "./Reservation";
import { DonorDTO } from "../../../models";

@Entity()
export class Donor implements DonorDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    idCard: number;

    @OneToMany(type => Reservation, reservation => reservation.donor)
    reservation: Reservation[];
}
