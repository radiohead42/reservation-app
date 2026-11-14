import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Haircares } from '../services/haircares';
import { Hours } from '../services/hours';
import { IHaircare } from '../models/haircare.model';
import { IHour } from '../models/hour.model';

@Component({
  imports: [TranslateModule, ReactiveFormsModule, NgClass],
  selector: 'app-add-booking',
  styleUrl: './add-booking.scss',
  templateUrl: './add-booking.html',
  providers: [DatePipe]
})
export class AddBooking implements OnInit {

  private readonly haircareService = inject(Haircares);
  private readonly hourService = inject(Hours);

  private formBuilder: FormBuilder = inject(FormBuilder);
  private datePipe: DatePipe = inject(DatePipe);

  formGroup: FormGroup = new FormGroup({});

  haircares = signal<IHaircare[]>([]);
  hours = signal<IHour[]>([]);

  ngOnInit(): void {
      this.formGroup = this.formBuilder.group({
        name: ['', Validators.required],
        date: [this.datePipe.transform( new Date(), 'yyyy-MM-dd' ), Validators.required],
        time: ['', Validators.required],
        haircare: ['', Validators.required],
      });

      this.haircareService.getHaircares().subscribe({
        next: (haircares: IHaircare[]) => {
          this.haircares.set(haircares);
          this.controlHaircare?.setValue(haircares[0].value)
        },
        error: () => {
        }
      });

      this.hourService.getHours().subscribe({
        next: (hours: IHour[]) => {
          this.hours.set(hours);
          this.controlTime?.setValue(hours[0].value)
        },
        error: () => {
        }
      });
  }

  get controlName() {
    return this.formGroup.get('name');
  }

  get controlDate() {
    return this.formGroup.get('date');
  }

  get controlTime() {
    return this.formGroup.get('time');
  }

  get controlHaircare() {
    return this.formGroup.get('haircare');
  }

  addBooking(): void {
    console.log(this.formGroup.value);
  }

}
