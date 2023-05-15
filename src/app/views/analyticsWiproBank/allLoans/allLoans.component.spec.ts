import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllLoansComponent } from './allLoans.component';

describe('AllLoansComponent', () => {
  let component: AllLoansComponent;
  let fixture: ComponentFixture<AllLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
