import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserSalariesComponent } from './single-user-salaries.component';

describe('SingleUserSalariesComponent', () => {
  let component: SingleUserSalariesComponent;
  let fixture: ComponentFixture<SingleUserSalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleUserSalariesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleUserSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
