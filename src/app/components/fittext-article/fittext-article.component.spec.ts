import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FittextArticleComponent } from './fittext-article.component';

describe('FittextArticleComponent', () => {
  let component: FittextArticleComponent;
  let fixture: ComponentFixture<FittextArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FittextArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FittextArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
