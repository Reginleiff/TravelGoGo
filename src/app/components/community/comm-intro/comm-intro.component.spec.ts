import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommIntroComponent } from './comm-intro.component';

describe('CommIntroComponent', () => {
  let component: CommIntroComponent;
  let fixture: ComponentFixture<CommIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
