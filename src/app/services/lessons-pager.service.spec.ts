import { TestBed } from '@angular/core/testing';

import { LessonsPagerService } from './lessons-pager.service';

describe('LessonsPagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LessonsPagerService = TestBed.get(LessonsPagerService);
    expect(service).toBeTruthy();
  });
});
