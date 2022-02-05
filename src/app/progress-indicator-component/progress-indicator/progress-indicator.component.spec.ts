import { Component, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync, TestBed,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressIndicatorComponent } from './progress-indicator.component';


describe('ProgressIndicatorComponent in isolation', () => {
  let component: ProgressIndicatorComponent;
  let fixture: ComponentFixture<ProgressIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressIndicatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a min radius of 50', () => {
    component.radius = 20;
    fixture.detectChanges();

    expect(component.radius).toBe(50);
  });

  it('should be able to set radius bigger than 50', () => {
    component.radius = 100;
    fixture.detectChanges();

    expect(component.radius).toBe(100);
  });

  it('should be able to set progress value', () => {
    component.progress = 60;
    fixture.detectChanges();

    expect(component.progress).toBe(60);
  });

  it('should not be able to set progress lower than 0', () => {
    component.progress = -1;
    fixture.detectChanges();

    expect(component.progress).toBe(0);
  });

  it('should not be able to set progress higher than 100', () => {
    component.progress = 150;
    fixture.detectChanges();

    expect(component.progress).toBe(100);
  });
});

@Component({
  template: `<t-progress
    [radius]="radius"
    [progress]="progress"
    [color]="color"
    (complete)="handleComplete()"
  ></t-progress>`,
})
class TestHostComponent {
  radius: number = 100;
  progress: number = 60;
  color: string = '#f5f5f5';

  handleComplete(): void {}
}

describe('ProgressIndicatorComponent within host component', () => {
  let hostComponent: TestHostComponent;
  let fixtureHostComponent: ComponentFixture<TestHostComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressIndicatorComponent, TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixtureHostComponent = TestBed.createComponent(TestHostComponent);
    hostComponent = fixtureHostComponent.componentInstance;
    debugElement = fixtureHostComponent.debugElement;
    fixtureHostComponent.detectChanges();
  });

  it('should have the correct color', () => {
    const canvas = debugElement.nativeElement.querySelector(
      '[data-testid=canvas]'
    );
    const ctx = canvas.getContext('2d');

    // check initial color
    expect(ctx.strokeStyle).toBe('#f5f5f5');

    hostComponent.color = '#128a7b';
    fixtureHostComponent.detectChanges();

    // check color after change
    expect(ctx.strokeStyle).toBe('#128a7b');
  });

  it('should change canvas dimension when radius is changed', () => {
    const canvas = debugElement.nativeElement.querySelector(
      '[data-testid=canvas]'
    );

    const { width: initailWidth, height: initialHeight } = canvas;

    expect(initailWidth).toBe(210);
    expect(initialHeight).toBe(210);

    hostComponent.radius = 150;
    fixtureHostComponent.detectChanges();

    const { width: newWidth, height: newHeight } = canvas;

    expect(newWidth).toBe(310);
    expect(newHeight).toBe(310);
  });

  it('should emit complete event', fakeAsync(() => {
    const progressIndicatorComponent: ProgressIndicatorComponent =
      fixtureHostComponent.debugElement.query(
        By.directive(ProgressIndicatorComponent)
      ).componentInstance;

    spyOn(hostComponent, 'handleComplete');
    spyOn(progressIndicatorComponent.complete, 'emit').and.callThrough();

    // keep this value to 0, if you want to increas this value also increas tick value
    // to allow the window.requestAnimationFrame to run and finish the animation
    hostComponent.progress = 0;
    fixtureHostComponent.detectChanges();

    tick(20);

    expect(hostComponent.handleComplete).toHaveBeenCalledTimes(1);
    expect(progressIndicatorComponent.complete.emit).toHaveBeenCalledTimes(1);
  }));
});
