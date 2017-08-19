import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerDayplanComponent } from './planner-dayplan.component';

import { Destination } from './../../../../objects';
import { PlannerService } from './../../../../services/planner.service';

describe('PlannerDayplanComponent', () => {
  let component: PlannerDayplanComponent;
  let fixture: ComponentFixture<PlannerDayplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerDayplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerDayplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
