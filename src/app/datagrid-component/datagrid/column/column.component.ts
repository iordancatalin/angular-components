import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 't-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent<T extends Object> implements OnInit {
  @Input() public name: string = '';
  @Input() public property!: keyof T;
  private sortable$ = new BehaviorSubject<boolean>(true);

  constructor() {}

  ngOnInit(): void {}

  @Input()
  public set sortable(sortableValue: boolean) {
    this.sortable$.next(sortableValue);
  }

  public get sortableObservable(): Observable<boolean> {
    return this.sortable$.asObservable();
  }
}
