import { Routes } from '@angular/router';
import { DonorListComponent } from './donor-list/donor-list.component';
import { DonorFormComponent } from './donor-form/donor-form.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import {LocationListComponent} from "./location-list/location-list.component";
import {LocationFormComponent} from "./location-form/location-form.component";

export const routes: Routes = [
    {
        path: '',
        component: DonorListComponent
    },
    {
        path: 'donor-list',
        component: DonorListComponent
    },
    {
        path: 'add-donor',
        component: DonorFormComponent
    },
    {
        path: 'edit-donor/:id',
        component: DonorFormComponent
    },
    {
        path: '',
        component: LocationListComponent
    },
    {
        path: 'location-list',
        component: LocationListComponent
    },
    {
        path: 'add-location',
        component: LocationFormComponent
    },
    {
        path: 'edit-location/:id',
        component: LocationFormComponent
    },
    {
        path: 'add-reservation',
        component: ReservationFormComponent
    },
    {
        path: 'reservations-of-location/:locationId',
        component: ReservationListComponent
    },
    {
        path: 'reservations-of-donor/:donorId',
        component: ReservationListComponent
    },
    {
        path: 'edit-reservation/:id',
        component: ReservationFormComponent
    }
];
