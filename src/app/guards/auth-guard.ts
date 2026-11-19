import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const loggedIn = localStorage.getItem('isLogged') === 'true';
  const router = inject(Router);

  if (loggedIn) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
