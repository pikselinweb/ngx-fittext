import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitLineHeroComponent } from './fit-line-hero.component';

describe('FitLineHeroComponent', () => {
  let component: FitLineHeroComponent;
  let fixture: ComponentFixture<FitLineHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitLineHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitLineHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
