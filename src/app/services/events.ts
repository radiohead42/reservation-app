import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IBooking } from '../models/booking.model';
import { IEvent } from '../models/event.model';
import { map, Observable, switchMap } from 'rxjs';
import { Haircares } from './haircares';

@Service()
export class Events {

  private readonly urlBase = `${environment.urlServer}/events`;
  private readonly httpService = inject(HttpClient);
  private readonly haircareService = inject(Haircares);

  createEvent(booking: IBooking): Observable<IEvent> {

    const formatDate = new Date(`${booking.date}T${booking.time}`).toISOString();

      return this.existEvent(formatDate).pipe(
        switchMap( (exist: boolean) => {
          if (!exist){
            return this.haircareService.getColor(booking.haircare);
          }else {
            throw new Error();
          }
        }),
      switchMap((fetchedColor: string) => {
        const event: IEvent = {
          start: new Date(formatDate),
          title: booking.name,
          description: booking.haircare,
          backgroundColor: fetchedColor || '',
          borderColor: fetchedColor || ''
        };
        return this.httpService.post<IEvent>(this.urlBase, event);
      })
    );
  }

  getEvents() {
    return this.httpService.get<IEvent[]>(this.urlBase);
  }

  private existEvent(date: string): Observable<boolean> {
    return this.httpService.get<IEvent[]>(`${this.urlBase}?start=${date}`).pipe(
      map( (events: IEvent[]) => events.length > 0 )
    );
  }

}
