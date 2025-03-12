import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { addCourseGuard } from './add-course.guard';

describe('addCourseGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => addCourseGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
