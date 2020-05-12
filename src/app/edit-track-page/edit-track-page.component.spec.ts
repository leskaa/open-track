import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrackPageComponent } from './edit-track-page.component';

describe('EditTrackPageComponent', () => {
  let component: EditTrackPageComponent;
  let fixture: ComponentFixture<EditTrackPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTrackPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
