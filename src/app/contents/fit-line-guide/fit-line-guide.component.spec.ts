import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitLineGuideComponent } from './fit-line-guide.component';

describe('FitLineGuideComponent', () => {
  let component: FitLineGuideComponent;
  let fixture: ComponentFixture<FitLineGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitLineGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitLineGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
