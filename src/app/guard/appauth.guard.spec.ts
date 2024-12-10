import { TestBed } from '@angular/core/testing';

import { AppauthGuard } from './appauth.guard';

describe('AppauthGuard', () => {
  let guard: AppauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AppauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
