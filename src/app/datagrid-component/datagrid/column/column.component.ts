import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { isNonNullable } from 'src/util/util';

@Component({
  selector: 't-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent<T> implements OnInit {
  private name$ = new BehaviorSubject<string>('');
  private propety$ = new BehaviorSubject<keyof T | null>(null);
  private sortable$ = new BehaviorSubject<boolean>(true);

  constructor() {}

  ngOnInit(): void {}

  @Input()
  public set name(nameValue: string) {
    this.name$.next(nameValue);
  }

  @Input()
  public set property(propertyValue: keyof T) {
    this.propety$.next(propertyValue);
  }

  @Input()
  public set sortable(sortableValue: boolean) {
    this.sortable$.next(sortableValue);
  }

  public get nameObservable(): Observable<string> {
    return this.name$.asObservable();
  }

  public get propertyObservable(): Observable<keyof T> {
    return this.propety$.pipe(filter(isNonNullable));
  }

  public get sortableObservable(): Observable<boolean> {
    return this.sortable$.asObservable();
  }
}
