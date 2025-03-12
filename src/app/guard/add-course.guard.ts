import { CanActivateFn } from '@angular/router';

export const addCourseGuard: CanActivateFn = (route, state) => {
  let role =
    typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('role')
      : null;
  if (role == 'teacher' || role == 'admin') return true;
  return false;
};
