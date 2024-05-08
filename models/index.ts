import {Column} from "typeorm";

export interface DonorDTO {
    id: number;
    name: string;
    address: string;
    phone: string;
    idCard: number;
}

export interface LocationDTO {
    id: number;
    name: string;
    address: string;
    active: boolean;
}

export interface DonationDTO {
    id: number;
    donationDate: string;
    donor: DonorDTO|null;
    location: LocationDTO|null;
    can_donate: boolean;
    reason: string;
    doctor: string;
    directed: boolean;
    recipient_name: string;
    recipient_idCard: number;
}
