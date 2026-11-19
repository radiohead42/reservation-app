import { Routes } from '@angular/router';
import { AddBooking } from './add-booking/add-booking';
import { Login } from './login/login';
import { Logout } from './logout/logout';
import { EventsCalendar } from './events-calendar/events-calendar';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  { path: 'add-booking', component: AddBooking },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  { path: 'events-calendar', component: EventsCalendar, canActivate: [authGuard] },
  { path: '**', redirectTo: 'add-booking' }
];
