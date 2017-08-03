import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerInfoComponent } from './planner-info.component';

describe('PlannerInfoComponent', () => {
  let component: PlannerInfoComponent;
  let fixture: ComponentFixture<PlannerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
