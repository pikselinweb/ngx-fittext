import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitTextComponent } from './fit-text.component';

describe('FitTextComponent', () => {
  let component: FitTextComponent;
  let fixture: ComponentFixture<FitTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
