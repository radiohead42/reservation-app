import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IHour } from '../models/hour.model';

@Service()
export class Hours {

  private readonly urlBase = `${environment.urlServer}/hours`;
  private readonly httpService = inject(HttpClient);

  getHours() {
    return this.httpService.get<IHour[]>(this.urlBase);
  }

}
