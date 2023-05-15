import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { clientAnalyticsComponent } from './clientAnalytics.component';

describe('clientAnalyticsComponent', () => {
  let component: clientAnalyticsComponent;
  let fixture: ComponentFixture<clientAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ clientAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(clientAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
