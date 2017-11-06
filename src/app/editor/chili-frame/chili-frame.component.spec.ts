import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiliFrameComponent } from './chili-frame.component';

describe('ChiliFrameComponent', () => {
  let component: ChiliFrameComponent;
  let fixture: ComponentFixture<ChiliFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiliFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiliFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
