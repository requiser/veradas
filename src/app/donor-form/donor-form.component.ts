import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DonorDTO } from '../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DonorService } from '../services/donor.service';

@Component({
  selector: 'app-donor-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './donor-form.component.html',
  styleUrl: './donor-form.component.css'
})
export class DonorFormComponent implements OnInit {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastrService = inject(ToastrService);
  donorService = inject(DonorService);

  donorForm = this.fb.group<DonorDTO>({
    id: 0,
    name: '',
    address: '',
    phone: '',
    idCard: 0
  });

  isNewDonor = true;

  ngOnInit(): void {
    this.donorForm.get('donorId')?.disable();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isNewDonor = false;
      this.donorService.getOne(id).subscribe({
        next: donor => this.donorForm.setValue(donor),
        error: (err) => this.toastrService.error('Hiba a véradók betöltésekor', 'Hiba')
      });
    }
  }

  saveDonor() {
    const donor = this.donorForm.value;
    if(this.isValidTAJ((donor as DonorDTO).idCard)){
      if (this.isNewDonor) {
        this.donorService.create(donor as DonorDTO).subscribe({
          next: () => {
            this.toastrService.success('Sikeres mentés', 'Siker');
            this.router.navigateByUrl('/donor-list');
          },
          error: (err) => {
            console.error(err);
            this.toastrService.error('Hiba a mentés során.', 'Hiba')
          }
        });
      } else {
        this.donorService.update(donor as DonorDTO).subscribe({
          next: () => {
            this.toastrService.success('Sikeres mentés', 'Siker');
            this.router.navigateByUrl('/donor-list');
          },
          error: (err) => {
            console.error(err);
            this.toastrService.error('Hiba a mentés során.', 'Hiba')
          }
        });
      }
    }
    else {
          console.error('Hibás TAJ szám.');
          this.toastrService.error('Hibás TAJ szám.', 'Hiba')
    }
  }
  //123456788
  //234567898
  isValidTAJ(idCard: number): boolean {
    const idCardStr = idCard.toString();

    if (idCardStr.length !== 9) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 8; i++) {
        const digit = parseInt(idCardStr[i]);
        sum += (i % 2 === 0) ? digit * 3 : digit * 7;
        console.log(sum);
    }
    const checksum = sum % 10;
    const lastDigit = parseInt(idCardStr[8]);
    console.log(checksum+', '+lastDigit)
    return checksum === lastDigit;
}
}
