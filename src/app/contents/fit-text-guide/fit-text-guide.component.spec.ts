import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitTextGuideComponent } from './fit-text-guide.component';

describe('FitTextGuideComponent', () => {
  let component: FitTextGuideComponent;
  let fixture: ComponentFixture<FitTextGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitTextGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitTextGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
