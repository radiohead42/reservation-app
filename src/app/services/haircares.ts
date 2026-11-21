import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IHaircare } from '../models/haircare.model';
import { map } from 'rxjs';

@Service()
export class Haircares {

  private urlBase = `${environment.urlServer}/haircares`;
  private readonly httpService = inject(HttpClient);

  getHaircares(){
    return this.httpService.get<IHaircare[]>(this.urlBase)
  }

  getColor(haircare: string) {
    return this.httpService.get<IHaircare[]>(`${this.urlBase}?value=${haircare}`).pipe(
      map( (haircare: IHaircare[]) => haircare[0].color));
  }

}
