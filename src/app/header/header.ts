import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  imports: [RouterLink, TranslateModule, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {

  private readonly translateService = inject(TranslateService);

  languages = signal<string[]>(['es', 'en']);

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }

}
