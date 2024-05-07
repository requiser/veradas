import { Component, OnInit, inject } from '@angular/core';
import { DonorService } from '../services/donor.service';
import { ReservationDTO, DonorDTO, LocationDTO } from '../../../models';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { ToastrService } from 'ngx-toastr';
import {LocationService} from "../services/location.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  donorService = inject(DonorService);
  locationService = inject(LocationService);
  reservationService = inject(ReservationService);
  toastrService = inject(ToastrService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  fb = inject(FormBuilder);

  isNewReservation = true;

  reservationForm = this.fb.group<ReservationDTO>({
    id: 0,
    donor: null,
    location: null,
    reservationDate: ''
  });

  donors: DonorDTO[] = [];
  locations: LocationDTO[] = [];

  ngOnInit(): void {
      this.reservationForm.get('id')?.disable();
      const id = this.route.snapshot.params['id'];

      this.donorService.getAll().subscribe({
        next: (donors) => this.donors = donors
      });
      this.locationService.getAll().subscribe({
        next: (locations) => this.locations = locations
      });

      if (id) {
        this.isNewReservation = false;
        this.reservationService.getOne(id).subscribe({
          next: reservation => this.reservationForm.setValue(reservation),
          error: (err) => this.toastrService.error('Hiba a foglalás betöltésekor', 'Hiba')
        });
      }
  }

  saveReservation() {
    const reservation = this.reservationForm.value;
    if (this.isNewReservation) {
      console.log('create')
      this.reservationService.create(reservation as ReservationDTO).subscribe({
        next: () => {
          this.toastrService.success('Foglalás végrehajtva!', 'Siker');
          // @ts-ignore
          this.router.navigateByUrl('');
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('Foglalás nem sikerült.', 'Hiba');
        }
      });
    } else {
      console.log('update')
      this.reservationService.update(reservation as ReservationDTO).subscribe({
        next: () => {
          console.log(reservation)
          this.toastrService.success('Sikeres mentés', 'Siker');
          this.router.navigateByUrl('');
        },
        error: (err) => {
          console.log(reservation)
          console.error(err);
          this.toastrService.error('Hiba a mentés során.', 'Hiba');
        }
      });
    }
  }
}
