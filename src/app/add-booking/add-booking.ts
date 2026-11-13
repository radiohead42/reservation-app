import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Haircares } from '../services/haircares';
import { Hours } from '../services/hours';
import { IHaircare } from '../models/haircare.model';
import { IHour } from '../models/hour.model';

@Component({
  imports: [TranslateModule, ReactiveFormsModule],
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

  private formGroup: FormGroup = new FormGroup({});

  haircares = signal(Hau);

  ngOnInit(): void {
      this.formGroup = this.formBuilder.group({
        name: ['', Validators.required],
        date: [this.datePipe.transform( new Date(), 'yyyy-MM-dd' ), Validators.required],
        time: ['', Validators.required],
        haircare: ['', Validators.required],
      });

      this.haircareService.getHaircares().subscribe({
        next: (haircares: IHaircare[]) => {
        },
        error: () => {
        }
      });

      this.hourService.getHours().subscribe({
        next: (hours: IHour[]) => {
        },
        error: () => {
        }
      });
  }

  addBooking(): void {
    console.log(this.formGroup.value);
  }

}
