import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
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

  private readonly textColor = '#fff';
  private readonly textFont = '30px Arial';
  private readonly textAlign = 'center';
  private readonly textBaseline = 'middle';

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.startAnimateProgressIndicator();
  }

  ngAfterViewInit(): void {
    this.canvasContext = this.canvas.nativeElement.getContext('2d');

    this.startAnimateProgressIndicator();
  }

  private startAnimateProgressIndicator(): void {
    if (this.canvasContext != null) {
      this.canvasContext.lineCap = 'round';

      this.degree = 0;
      this.currentProgress = Math.floor((this.degree * 100) / 360);

      window.requestAnimationFrame(this.drowCircle.bind(this));
    }
  }

  private drowCircle(): void {
    if (this.canvasContext != null) {
      this.canvasContext.clearRect(
        0,
        0,
        this.canvasContext.canvas.height,
        this.canvasContext.canvas.width
      );

      this.degree++;

      this.currentProgress = Math.floor((this.degree * 100) / 360);

      this.canvasContext.beginPath();
      this.canvasContext.strokeStyle = this.color;
      this.canvasContext.arc(
        this.canvasContext.canvas.width / 2,
        this.canvasContext.canvas.height / 2,
        this._radius,
        this.degreesToRadians(0) - Math.PI / 2,
        this.degreesToRadians(this.degree) - Math.PI / 2
      );
      this.canvasContext.lineWidth = 10;
      this.canvasContext.stroke();

      this.canvasContext.fillStyle = this.textColor;
      this.canvasContext.font = this.textFont;
      this.canvasContext.textAlign = this.textAlign;
      this.canvasContext.textBaseline = this.textBaseline;

      this.canvasContext.fillText(
        `${this.currentProgress}%`,
        this.canvasContext.canvas.width / 2,
        this.canvasContext.canvas.height / 2
      );

      if (this.currentProgress < this._progress) {
        window.requestAnimationFrame(this.drowCircle.bind(this));
      } else {
        this.complete.emit();
      }
    }
  }

  @Input()
  public set progress(progressValue: number) {
    if (progressValue < 0) {
      this._progress = progressValue;
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
    this._radius = radiusValue >= 50 ? radiusValue : 50;
  }

  private degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }
}
