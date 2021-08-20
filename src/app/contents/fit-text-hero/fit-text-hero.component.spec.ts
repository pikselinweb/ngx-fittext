import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitTextHeroComponent } from './fit-text-hero.component';

describe('FitTextHeroComponent', () => {
  let component: FitTextHeroComponent;
  let fixture: ComponentFixture<FitTextHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitTextHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitTextHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
