import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommDiscussionComponent } from './comm-discussion.component';

describe('CommDiscussionComponent', () => {
  let component: CommDiscussionComponent;
  let fixture: ComponentFixture<CommDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
