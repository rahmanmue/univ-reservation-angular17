import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const publicGuard: CanActivateFn = (route, state) => {
  const routeMod = inject(Router)
  const authToken = localStorage.getItem('token') ? true : false;
  const role = localStorage.getItem('role');
  const isLogin = state.url == '/login';
  if(authToken && isLogin){
    if(role == "ROLE_GENERAL"){
      routeMod.navigate(['/home'])
    }else if(role == "ROLE_ADMIN"){
      routeMod.navigate(['/dashboard'])
    }
    return false;
  }
  
  return true;
};
