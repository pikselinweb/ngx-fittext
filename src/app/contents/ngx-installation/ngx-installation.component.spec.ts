import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxInstallationComponent } from './ngx-installation.component';

describe('NgxInstallationComponent', () => {
  let component: NgxInstallationComponent;
  let fixture: ComponentFixture<NgxInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxInstallationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
