import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerItemComponent } from './planner-item.component';

describe('PlannerItemComponent', () => {
  let component: PlannerItemComponent;
  let fixture: ComponentFixture<PlannerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
