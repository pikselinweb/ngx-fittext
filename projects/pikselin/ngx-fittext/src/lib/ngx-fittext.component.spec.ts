import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFittextComponent } from './ngx-fittext.component';

describe('NgxFittextComponent', () => {
  let component: NgxFittextComponent;
  let fixture: ComponentFixture<NgxFittextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFittextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFittextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
