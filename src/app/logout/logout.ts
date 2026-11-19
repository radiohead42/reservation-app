import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../services/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: '',
  template: './logout.html',
})
export class Logout implements OnInit {

  private readonly authService = inject(Auth);
  private readonly toastrService = inject(ToastrService);
  private readonly translateService = inject(TranslateService);
  private readonly router = inject(Router);

  ngOnInit(): void {
      this.authService.logout().subscribe({
        next: () => {
          this.toastrService.success(
            this.translateService.instant('logout.success'),
            this.translateService.instant('success')
          );
          this.router.navigateByUrl('add-booking');
        }
      })
  }

}
