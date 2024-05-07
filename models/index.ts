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

export interface ReservationDTO {
    id: number;
    reservationDate: string;
    donor: DonorDTO|null;
    location: LocationDTO|null;
}
