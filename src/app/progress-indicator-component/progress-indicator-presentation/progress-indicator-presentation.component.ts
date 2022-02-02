import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, startWith } from 'rxjs';

@Component({
  selector: 't-progress-indicator-presentation',
  templateUrl: './progress-indicator-presentation.component.html',
  styleUrls: ['./progress-indicator-presentation.component.scss'],
})
export class ProgressIndicatorPresentationComponent implements OnInit {
  public progressFormControl = new FormControl(20);
  public radiusFormControl = new FormControl(50);
  public colorFormControl = new FormControl('#ffffff');

  public progressValue$!: Observable<any>;
  public radiusValue$!: Observable<any>;
  public colorValue$!: Observable<any>;

  constructor() {}

  ngOnInit(): void {
    this.progressValue$ = this.progressFormControl.valueChanges.pipe(
      debounceTime(300),
      startWith(this.progressFormControl.value as number)
    );

    this.radiusValue$ = this.radiusFormControl.valueChanges.pipe(
      debounceTime(300),
      startWith(this.radiusFormControl.value)
    );

    this.colorValue$ = this.colorFormControl.valueChanges.pipe(
      debounceTime(300),
      startWith(this.colorFormControl.value)
    );
  }

  handeCompleteEvent() {
    console.log('Complete event was emitted');
  }
}
