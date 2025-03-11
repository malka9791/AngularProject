import { CanActivateFn } from '@angular/router';

export const lessonGuard: CanActivateFn = (route, state) => {
  const id = Number(route.paramMap.get('courseId'));
    return !isNaN(id) && id > 0; // רק מספרים תקפים
};
