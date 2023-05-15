import { TestBed } from '@angular/core/testing';

import { clientAnalyticsService } from './clientAnalytics.service';

describe('clientAnalytics', () => {
  let service: clientAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(clientAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
