import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommCommentComponent } from './comm-comment.component';

describe('CommCommentComponent', () => {
  let component: CommCommentComponent;
  let fixture: ComponentFixture<CommCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
