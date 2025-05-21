import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../account/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if(authService.isLoggedIn() && !authService.isTokenExpired()){
    return true;
  }else{
    authService.logout();
    return false;
  }
};
