import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {DonorDTO, ReservationDTO} from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  http = inject(HttpClient);

  create(reservation: ReservationDTO) {
    return this.http.post<ReservationDTO>('/api/reservation', reservation);
  }

  getReservationsOfDonor(donorId: number) {
    return this.http.get<ReservationDTO[]>('/api/reservation/of/donor/' + donorId);
  }

  getOne(id: number) {
    return this.http.get<ReservationDTO>('/api/reservation/' + id);
  }

  getReservationsOfLocation(locationId: number) {
    return this.http.get<ReservationDTO[]>('/api/reservation/of/location/' + locationId);
  }

  update(reservation: ReservationDTO) {
    return this.http.put<ReservationDTO>('/api/reservation', reservation);
  }

  delete(id: number) {
    return this.http.delete('/api/reservation/' + id);
  }
  getAll() {
    return this.http.get<ReservationDTO[]>('/api/reservation');
  }
}
