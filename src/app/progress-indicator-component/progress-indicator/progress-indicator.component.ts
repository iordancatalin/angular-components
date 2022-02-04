import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 't-progress',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressIndicatorComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @ViewChild('canvas')
  public canvas!: ElementRef<HTMLCanvasElement>;

  @Input()
  public color: string = '#fff';

  @Output()
  public complete = new EventEmitter<void>();

  private currentProgress = 0;

  private _progress: number = 0;
  private _radius: number = 50;

  private canvasContext!: CanvasRenderingContext2D | null;
  private degree = 0;

  private animationRef!: number;

  private readonly textColor = '#fff';
  private readonly textFont = '30px Arial';
  private readonly textAlign = 'center';
  private readonly textBaseline = 'middle';
  private readonly lineWidth = 10;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.animationRef) {
      window.cancelAnimationFrame(this.animationRef);
    }

    this.startAnimateProgressIndicator();
  }

  ngAfterViewInit(): void {
    this.canvasContext = this.canvas.nativeElement.getContext('2d');

    const dimension = this._radius * 2 + this.lineWidth;
    this.setCanvasDimension(dimension, dimension);

    this.startAnimateProgressIndicator();
  }

  private setCanvasDimension(width: number, height: number): void {
    if (this.canvasContext) {
      this.canvasContext.canvas.width = width;
      this.canvasContext.canvas.height = height;
    }
  }

  private startAnimateProgressIndicator(): void {
    if (this.canvasContext != null) {
      this.canvasContext.lineCap = 'round';

      this.degree = 0;
      this.currentProgress = Math.floor((this.degree * 100) / 360);

      this.canvasContext.strokeStyle = this.color;
      this.canvasContext.lineWidth = 10;
      this.canvasContext.fillStyle = this.textColor;
      this.canvasContext.font = this.textFont;
      this.canvasContext.textAlign = this.textAlign;
      this.canvasContext.textBaseline = this.textBaseline;

      this.animationRef = window.requestAnimationFrame(
        this.animateCircle.bind(this)
      );
    }
  }

  private animateCircle(): void {
    if (this.canvasContext != null) {
      this.canvasContext.clearRect(
        0,
        0,
        this.canvasContext.canvas.width,
        this.canvasContext.canvas.height
      );

      this.degree++;

      this.currentProgress = Math.floor((this.degree * 100) / 360);

      this.canvasContext.beginPath();

      this.canvasContext.arc(
        this.canvasContext.canvas.width / 2,
        this.canvasContext.canvas.height / 2,
        this._radius,
        this.degreesToRadians(0) - Math.PI / 2,
        this.degreesToRadians(this.degree) - Math.PI / 2
      );

      this.canvasContext.stroke();

      this.canvasContext.fillText(
        `${this.currentProgress}%`,
        this.canvasContext.canvas.width / 2,
        this.canvasContext.canvas.height / 2
      );

      if (this.currentProgress < this._progress) {
        this.animationRef = window.requestAnimationFrame(
          this.animateCircle.bind(this)
        );
      } else {
        this.complete.emit();
      }
    }
  }

  @Input()
  public set progress(progressValue: number) {
    if (progressValue < 0) {
      this._progress = 0;
      return;
    }

    if (progressValue > 100) {
      this._progress = 100;
      return;
    }

    this._progress = progressValue;
  }

  @Input()
  public set radius(radiusValue: number) {
    const newRadiusValue = radiusValue >= 50 ? radiusValue : 50;

    if (newRadiusValue !== this._radius) {
      this._radius = newRadiusValue;

      const dimension = this._radius * 2 + this.lineWidth;
      this.setCanvasDimension(dimension, dimension);
    }
  }

  public get radius(): number {
    return this._radius;
  }

  public get progress(): number {
    return this._progress;
  }

  private degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }
}
