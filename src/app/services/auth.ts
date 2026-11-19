import { Service } from '@angular/core';
import { IAuth } from '../models/auth.models';
import { BehaviorSubject, of } from 'rxjs';

@Service()
export class Auth {

  private subjectAuth = new BehaviorSubject<boolean>(localStorage.getItem('isLogged') === 'true' );
  isAuthenticated = this.subjectAuth.asObservable();

  login(authCredentials: IAuth) {
    let succes = false;
    if(authCredentials.email == 'correo@correo.com' && authCredentials.password == '123456') {
      succes = true;
      localStorage.setItem('isLogged', 'true');
      this.subjectAuth.next(true);
    }

    return of(succes);
  }

  logout() {
    localStorage.removeItem('isLogged');
    this.subjectAuth.next(false);
    return of(true);
  }

}
