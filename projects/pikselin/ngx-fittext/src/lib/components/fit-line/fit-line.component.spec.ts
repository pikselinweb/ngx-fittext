import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitLineComponent } from './fit-line.component';

describe('FitLineComponent', () => {
  let component: FitLineComponent;
  let fixture: ComponentFixture<FitLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
