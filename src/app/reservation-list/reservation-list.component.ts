import { Component, OnInit, inject } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { ReservationDTO } from '../../../models';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import {waitForAsync} from "@angular/core/testing";

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  reservationService = inject(ReservationService);
  toastrService = inject(ToastrService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  reservations: ReservationDTO[] = [];

  ngOnInit(): void {
    const donorId = this.route.snapshot.params['donorId'];
    const locationId = this.route.snapshot.params['locationId'];

    if (donorId!==undefined){
      this.reservationService.getReservationsOfDonor(donorId).subscribe({
        next: (trans) => this.reservations = trans,
        error: err => {
          console.error(err);
          this.toastrService.error('Hiba a betöltés során.', 'Hiba');
        }
    });
    }
    else if (locationId!==undefined) {
      this.reservationService.getReservationsOfLocation(locationId).subscribe({
        next: (trans) => this.reservations = trans,
        error: err => {
          console.error(err);
          this.toastrService.error('Hiba a betöltés során.', 'Hiba');
        }
      });
    }
    else {
      this.reservationService.getAll().subscribe({
      next: (reservations) => this.reservations = reservations,
      error: err => console.error(err)
    });
    }
  }

  editReservation(id: number) {
    this.router.navigate([ 'edit-reservation', id ]);
  }

  deleteReservation(id: number) {
    this.reservationService.delete(id).subscribe({
      next: () => {
        this.toastrService.success('Sikeres törlés', 'Siker')
        const index = this.reservations.findIndex((reservation) => reservation.id == id);
        this.reservations.splice(index, 1);
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a törlés során.', 'Hiba');
      }
    });
  }
}
