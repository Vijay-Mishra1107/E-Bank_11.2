import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmiListComponent } from './all-emi-list.component';

describe('AllEmiListComponent', () => {
  let component: AllEmiListComponent;
  let fixture: ComponentFixture<AllEmiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEmiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
