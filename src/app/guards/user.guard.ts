import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = checkAuthentication();
  const role = localStorage.getItem('role');

  if (!isAuthenticated || role !== 'ROLE_GENERAL') {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

function checkAuthentication() {
  const token = localStorage.getItem('token');
  if (typeof token === 'string') {
    try {
      const decoded: any = jwtDecode(token);
      const userIdToken = decoded.sub;
      const userIdLocal = localStorage.getItem('userId');
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

function getUserRole() {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded: any = jwtDecode(token);
    return decoded.role;
  }
  return null;
}
