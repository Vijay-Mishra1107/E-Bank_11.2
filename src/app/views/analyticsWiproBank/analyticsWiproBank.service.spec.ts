import { TestBed } from '@angular/core/testing';

import { analyticsWiproBank } from './analyticsWiproBank.service';

describe('analyticsWiproBank', () => {
  let service: analyticsWiproBank;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(analyticsWiproBank);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
