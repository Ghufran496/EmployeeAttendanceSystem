import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserAttendancesComponent } from './single-user-attendances.component';

describe('SingleUserAttendancesComponent', () => {
  let component: SingleUserAttendancesComponent;
  let fixture: ComponentFixture<SingleUserAttendancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleUserAttendancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleUserAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
