import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommReviewComponent } from './comm-review.component';

describe('CommReviewComponent', () => {
  let component: CommReviewComponent;
  let fixture: ComponentFixture<CommReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
