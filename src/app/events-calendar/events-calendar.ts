import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Events } from '../services/events';
import { AsyncPipe } from '@angular/common';
import { Haircares } from '../services/haircares';

@Component({
  imports: [FullCalendarModule, AsyncPipe],
  selector: 'app-events-calendar',
  styleUrl: './events-calendar.scss',
  templateUrl: './events-calendar.html',
})
export class EventsCalendar implements OnInit {

  private translateService = inject(TranslateService);
  private readonly eventService = inject(Events);
  private readonly haircareService = inject(Haircares);

  events = this.eventService.getEvents();
  haircares = this.haircareService.getHaircares();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale: this.translateService.getCurrentLang() || 'es',
    firstDay: 1,
    headerToolbar: {
      left: 'title',
      right: 'prev,next'
    }
  };

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.translateService.onLangChange.subscribe({
      next: (event: LangChangeEvent) => {
        this.calendarOptions = {
          ...this.calendarOptions,
          locale: event.lang
        };
        console.log('Language changed to:', event.lang);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
