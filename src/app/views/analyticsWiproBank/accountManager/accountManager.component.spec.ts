import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { accountManager } from './accountManager.component';

describe('clientDashboardComponent', () => {
  let component: accountManager;
  let fixture: ComponentFixture<accountManager>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ accountManager ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(accountManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
