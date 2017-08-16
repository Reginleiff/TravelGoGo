import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStartComponent } from './home-start.component';

describe('HomeStartComponent', () => {
  let component: HomeStartComponent;
  let fixture: ComponentFixture<HomeStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
