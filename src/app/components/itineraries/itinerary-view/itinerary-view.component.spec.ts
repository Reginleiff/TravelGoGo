import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryViewComponent } from './itinerary-view.component';

describe('ItineraryViewComponent', () => {
  let component: ItineraryViewComponent;
  let fixture: ComponentFixture<ItineraryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
