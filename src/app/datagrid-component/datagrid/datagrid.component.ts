import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  isObservable,
  map,
  Observable,
  startWith,
  Subscription,
  tap
} from 'rxjs';
import { SortService } from '../services/sort.service';
import { ColumnComponent } from './column/column.component';
import {
  Direction,
  PaginationChangeEvent,
  SortChangeEvent,
  SortState
} from './datagrid.model';

@Component({
  selector: 't-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
  // use default chenage detection strategy because we need to render this component when a change occures in ColumnComponent
  // ex: if sortable value changes we need to rerender this component to allow(or not) the sort operation
})
export class DataGridComponent<T, K extends keyof T>
  implements OnInit, AfterViewInit, OnDestroy
{
  @Output() public paginationChange = new EventEmitter<PaginationChangeEvent>();
  @Output() public sortChange = new EventEmitter<SortChangeEvent>();

  @ContentChildren(ColumnComponent)
  public columnComponentChildren!: QueryList<ColumnComponent<K>>;

  public isSortable: boolean = true;
  public displayData$!: Observable<T[]>;

  public pageSizeFormControl = new FormControl(null, Validators.min(1));
  public currentPage$ = new BehaviorSubject<number>(1);
  public totalNumberOfPages$!: Observable<number>;

  public columnConfigs$!: Observable<QueryList<ColumnComponent<K>>>;
  public dataEntryProperties$!: Observable<K[]>;

  public sortState$ = new BehaviorSubject<SortState<T> | null>(null);

  private data$ = new BehaviorSubject<T[]>([]);
  private subsription!: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private sortService: SortService
  ) {}

  ngOnInit(): void {
    const pageSize$ = this.pageSizeFormControl.valueChanges.pipe(
      debounceTime(300),
      startWith(this.pageSizeFormControl.value),
      filter(() => this.pageSizeFormControl.valid)
    );

    this.displayData$ = combineLatest([
      this.data$,
      this.currentPage$,
      pageSize$,
      this.sortState$,
    ]).pipe(
      map(([data, currentPage, pageSize, sortState]) =>
        this.getCurrentPageData(data, currentPage, pageSize, sortState)
      )
    );

    this.totalNumberOfPages$ = combineLatest([this.data$, pageSize$]).pipe(
      map(([data, pageSize]) => {
        if (pageSize == null) {
          return 1;
        }

        const noOfFullPages = Math.floor(data.length / pageSize);
        return data.length % pageSize === 0 ? noOfFullPages : noOfFullPages + 1;
      }),
      tap((totalNumberOfPages) => {
        // update current page if it's bigger than the total number of pages
        if (totalNumberOfPages < this.currentPage$.value) {
          this.currentPage$.next(totalNumberOfPages);
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.columnConfigs$ = this.columnComponentChildren.changes.pipe(
      startWith(this.columnComponentChildren)
    );

    this.dataEntryProperties$ = this.columnConfigs$.pipe(
      map((children: QueryList<ColumnComponent<K>>) =>
        children.map((child) => child.property)
      )
    );

    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subsription) {
      this.subsription.unsubscribe();
    }
  }

  public handlePrevPage(): void {
    this.currentPage$.next(this.currentPage$.value - 1);
    this.paginationChange.emit({
      currentPage: this.currentPage$.value,
      pageSize: this.pageSizeFormControl.value,
    });
  }

  public handleNextPage(): void {
    this.currentPage$.next(this.currentPage$.value + 1);
    this.paginationChange.emit({
      currentPage: this.currentPage$.value,
      pageSize: this.pageSizeFormControl.value,
    });
  }

  public sortByColumn(column: ColumnComponent<K>): void {
    const newSortState = this.getUpdatedSortState(
      this.sortState$.value,
      column.name,
      column.property
    );

    this.sortState$.next(newSortState);

    this.sortChange.emit({
      columnName: column.name,
      direction: newSortState.direction,
    });
  }

  @Input()
  public set data(dataValue: T[] | Observable<T[]>) {
    if (isObservable(dataValue)) {
      if (this.subsription != null) {
        this.subsription.unsubscribe();
      }
      this.subsription = dataValue.subscribe((value) => this.data$.next(value));
    } else {
      this.data$.next(dataValue);
    }
  }

  @Input()
  public set pageSize(pageSizeValue: number | null) {
    this.pageSizeFormControl.setValue(pageSizeValue);
  }

  @Input()
  public set sortable(isSortable: boolean) {
    this.isSortable = isSortable;
  }

  public get Direction(): typeof Direction {
    return Direction;
  }

  public headerTracker(index: number, column: ColumnComponent<K>): string {
    return `${column.name}-${index}`;
  }

  public dataEntryTracker(index: number): number {
    return index;
  }

  public propertyTracker(index: number, property: K): string {
    return `${property}-${index}`;
  }

  private getCurrentPageData(
    data: T[],
    currentPage: number,
    pageSize: number | null,
    sortState: SortState<T> | null
  ): T[] {
    if (sortState != null) {
      data = this.sortService.sortByProperty<T, keyof T>(
        data,
        sortState.property,
        sortState.direction
      );
    }

    const sliceStart = pageSize != null ? (currentPage - 1) * pageSize : 0;
    const sliceEnd = pageSize != null ? currentPage * pageSize : data.length;

    return data.slice(sliceStart, sliceEnd);
  }

  private getUpdatedSortState(
    currentState: SortState<T> | null,
    columnName: string,
    property: keyof T
  ): SortState<T> {
    if (currentState != null && currentState.sortByColumn === columnName) {
      const newDirection: Direction =
        currentState.direction === Direction.ASCENDENT
          ? Direction.DESCENDENT
          : Direction.ASCENDENT;

      return {
        ...currentState,
        direction: newDirection,
      };
    }

    return {
      sortByColumn: columnName,
      property: property,
      direction: Direction.ASCENDENT,
    };
  }
}
