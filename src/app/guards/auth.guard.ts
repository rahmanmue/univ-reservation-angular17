import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


export const authGuard: CanActivateFn = (route, state) => {
  const routeMod = inject(Router)
  const isAuthenticated = checkAuthentication();

  if(!isAuthenticated){
    routeMod.navigate(['/login'])
    return false;
  }

  return true;
};

function checkAuthentication(){
  const token = localStorage.getItem('token') as string;
  const userIdLocal = localStorage.getItem('userId') 
   // Periksa apakah token ada dan merupakan string
   if (typeof token === 'string') {
    try {
      const decode = jwtDecode(token);
      const userIdToken = decode.sub;

      return userIdToken === userIdLocal;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  } else {
    console.error('Token not found');
    return false;
  }
}

function getRole(): string | undefined{
  const token = localStorage.getItem('token') as string;
  const decode = jwtDecode(token) as { role: string };
  const role = decode.role;
  return role
}