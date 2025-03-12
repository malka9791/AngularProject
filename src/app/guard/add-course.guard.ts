import { CanActivateFn } from '@angular/router';

export const addCourseGuard: CanActivateFn = (route, state) => {
  let role =
    typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem('role')
      : null;
  if (role == 'student') return false;
  return true;
};
