import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommListComponent } from './comm-list.component';

describe('CommListComponent', () => {
  let component: CommListComponent;
  let fixture: ComponentFixture<CommListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
