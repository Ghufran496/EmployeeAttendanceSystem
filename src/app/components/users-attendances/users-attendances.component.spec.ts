import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAttendancesComponent } from './users-attendances.component';

describe('UsersAttendancesComponent', () => {
  let component: UsersAttendancesComponent;
  let fixture: ComponentFixture<UsersAttendancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersAttendancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
