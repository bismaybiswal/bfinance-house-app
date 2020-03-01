import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpenseCardComponent } from './create-expense-card.component';

describe('UserProfileComponent', () => {
  let component: CreateExpenseCardComponent;
  let fixture: ComponentFixture<CreateExpenseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExpenseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExpenseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
