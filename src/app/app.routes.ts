import { Routes } from '@angular/router';
import { DonorListComponent } from './donor-list/donor-list.component';
import { DonorFormComponent } from './donor-form/donor-form.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { DonationListComponent } from './donation-list/donation-list.component';
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
        path: 'add-donation',
        component: DonationFormComponent
    },
    {
        path: 'donation-of-location/:locationId',
        component: DonationListComponent
    },
    {
        path: 'donation-of-donor/:donorId',
        component: DonationListComponent
    },
    {
        path: 'edit-donation/:id',
        component: DonationFormComponent
    }
];
