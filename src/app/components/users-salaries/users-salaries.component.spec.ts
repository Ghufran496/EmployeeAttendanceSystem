import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSalariesComponent } from './users-salaries.component';

describe('UsersSalariesComponent', () => {
  let component: UsersSalariesComponent;
  let fixture: ComponentFixture<UsersSalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSalariesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
