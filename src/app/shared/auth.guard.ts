import { CanActivateFn, Router, ROUTER_CONFIGURATION } from '@angular/router';
import { map, take } from 'rxjs';
import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export const authGuard: CanActivateFn = (route, state) => {

  const angularFireAuth = inject(AngularFireAuth);
  const router = inject(Router);

  return angularFireAuth.user.pipe(  
    map(user => {
      if (user != null) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    take(1)
  );  
};