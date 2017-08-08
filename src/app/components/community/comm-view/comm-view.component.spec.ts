import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommViewComponent } from './comm-view.component';

describe('CommViewComponent', () => {
  let component: CommViewComponent;
  let fixture: ComponentFixture<CommViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
