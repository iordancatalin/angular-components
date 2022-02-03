import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressIndicatorComponent } from '../progress-indicator/progress-indicator.component';

import { ProgressIndicatorPresentationComponent } from './progress-indicator-presentation.component';

describe('ProgressIndicatorPresentationComponent', () => {
  let component: ProgressIndicatorPresentationComponent;
  let fixture: ComponentFixture<ProgressIndicatorPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProgressIndicatorPresentationComponent, ProgressIndicatorComponent ]
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
