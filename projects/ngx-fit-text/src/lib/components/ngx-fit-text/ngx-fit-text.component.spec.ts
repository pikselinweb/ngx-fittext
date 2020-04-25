import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFitTextComponent } from './ngx-fit-text.component';

describe('NgxFitTextComponent', () => {
  let component: NgxFitTextComponent;
  let fixture: ComponentFixture<NgxFitTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFitTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFitTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
