import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Auth } from '../services/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [RouterLink, TranslateModule, RouterLinkActive, AsyncPipe],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {

  private readonly translateService = inject(TranslateService);
  private authService = inject(Auth);

  languages = signal<string[]>(['es', 'en']);
  isAuthenticated = this.authService.isAuthenticated;

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }

}
