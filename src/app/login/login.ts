import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IAuth } from '../models/auth.models';
import { Auth } from '../services/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, TranslateModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login implements OnInit {

  private formBuilder = inject(FormBuilder);
  private authService = inject(Auth);
  private toastrService = inject(ToastrService);
  private translateService = inject(TranslateService);
  private router = inject(Router);

  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    const auth: IAuth = this.formGroup.value;
    this.authService.login(auth).subscribe({
      next: (success: boolean) => {
        if(success) {
          this.toastrService.success(
            this.translateService.instant('login.success'),
            this.translateService.instant('success')
          );
          this.router.navigateByUrl('events-calendar');
        }else {
          this.toastrService.error(
            this.translateService.instant('login.error'),
            this.translateService.instant('error')
          );
        }
      }
    })
  }

}
