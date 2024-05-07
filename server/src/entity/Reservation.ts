import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Donor } from "./Donor";
import { ReservationDTO } from "../../../models";
import {Location} from "./Location";

@Entity()
export class Reservation implements ReservationDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    reservationDate: string;

    @ManyToOne(type => Donor, donor => donor.reservation, { eager: true })
    donor: Donor;

    @ManyToOne(type => Location, location => location.reservation, { eager: true })
    location: Location;
}
