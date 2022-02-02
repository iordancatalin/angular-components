import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressIndicatorPresentationComponent } from './progress-indicator-presentation.component';

describe('ProgressIndicatorPresentationComponent', () => {
  let component: ProgressIndicatorPresentationComponent;
  let fixture: ComponentFixture<ProgressIndicatorPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressIndicatorPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressIndicatorPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
