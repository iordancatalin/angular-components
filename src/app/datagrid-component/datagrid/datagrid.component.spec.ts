import { Component, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SortService } from '../services/sort.service';
import { ColumnComponent } from './column/column.component';
import { DataGridComponent } from './datagrid.component';
import {
  Direction,
  PaginationChangeEvent,
  SortChangeEvent,
} from './datagrid.model';

type TestDataModel = { id: number; name: string };

describe('DataGridComponent insolated', () => {
  let component: DataGridComponent<TestDataModel>;
  let fixture: ComponentFixture<DataGridComponent<TestDataModel>>;
  let sortServiceSpy: jasmine.SpyObj<SortService>;

  beforeEach(async () => {
    sortServiceSpy = spyOnAllFunctions(new SortService());

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: SortService,
          use: sortServiceSpy,
        },
      ],
      declarations: [DataGridComponent],
    });
  });

  beforeEach(() => {
    fixture =
      TestBed.createComponent<DataGridComponent<TestDataModel>>(
        DataGridComponent
      );

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `
    <t-datagrid
      [data]="testData"
      [sortable]="sortable"
      [pageSize]="pageSize"
      (paginationChange)="handlePaginationChange($event)"
      (sortChange)="handleSortChange($event)"
    >
      <t-column name="Id" property="id" [sortable]="true"></t-column>
      <t-column name="Name" property="name" [sortable]="false"></t-column>
    </t-datagrid>
  `,
})
class TestHostComponent {
  testData: TestDataModel[];
  sortable: boolean = true;
  pageSize: number | null = 5;

  constructor() {
    this.testData = [
      { id: 2, name: 'Test 2' },
      { id: 5, name: 'Test 5' },
      { id: 1, name: 'Test 1' },
      { id: 3, name: 'Test 3' },
      { id: 6, name: 'Test 6' },
      { id: 4, name: 'Test 4' },
      { id: 7, name: 'Test 7' },
      { id: 8, name: 'Test 8' },
    ];
  }

  public handlePaginationChange(paginationChangeEvent: PaginationChangeEvent) {}
  public handleSortChange(sortChangeEvent: SortChangeEvent) {}
}

describe('DatagridComponent within host component', () => {
  let fixtureHostComponent: ComponentFixture<TestHostComponent>;

  const expectButtonToBeDisaled = (buttonElement: HTMLButtonElement) => {
    expect(buttonElement.hasAttribute('disabled')).toBeTrue();
  };

  const expectButtonToBeEnabled = (buttonElement: HTMLButtonElement) => {
    expect(buttonElement.hasAttribute('disabled')).toBeFalse();
  };

  const expectNextButtonToBeDisabled = () =>
    expectButtonToBeDisaled(
      fixtureHostComponent.nativeElement.querySelector(
        '[data-testid=next-button]'
      )
    );

  const expectNextButtonToBeEnabled = () =>
    expectButtonToBeEnabled(
      fixtureHostComponent.nativeElement.querySelector(
        '[data-testid=next-button]'
      )
    );

  const expectPrevButtonToBeDisabled = () =>
    expectButtonToBeDisaled(
      fixtureHostComponent.nativeElement.querySelector(
        '[data-testid=prev-button]'
      )
    );

  const expectPrevButtonToBeEnabled = () =>
    expectButtonToBeEnabled(
      fixtureHostComponent.nativeElement.querySelector(
        '[data-testid=prev-button]'
      )
    );

  const expectCurrentPageToBe = (expectedValue: number) => {
    const { textContent: currentPage } =
      fixtureHostComponent.nativeElement.querySelector(
        '[data-testid=current-page-number]'
      );

    expect(parseInt(currentPage)).toBe(expectedValue);
  };

  const expectTotalNoOfPagesToBe = (expectedValue: number) => {
    const { textContent: totalNumberOfPages } =
      fixtureHostComponent.nativeElement.querySelector(
        '[data-testid=total-pages-number'
      );

    expect(parseInt(totalNumberOfPages)).toBe(expectedValue);
  };

  const expectNoOfRowsToBe = (expectedValue: number) => {
    const tableRows: DebugElement[] =
      fixtureHostComponent.debugElement.queryAll(
        By.css('[data-testid=table-row]')
      );

    expect(tableRows.length).toBe(expectedValue);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [SortService],
      declarations: [DataGridComponent, ColumnComponent, TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixtureHostComponent = TestBed.createComponent(TestHostComponent);
    fixtureHostComponent.detectChanges();
  });

  it('should display a data grid with two column', () => {
    const headCells = fixtureHostComponent.debugElement.queryAll(
      By.css('[data-testid=head-cell]')
    );

    expect(headCells.length).toBe(2);
  });

  it('footer should have corrent values for current page and total number of pages', () => {
    expectCurrentPageToBe(1);
    expectTotalNoOfPagesToBe(2);
  });

  it('should have prev button disabled and next button enabled', () => {
    expectPrevButtonToBeDisabled();
    expectNextButtonToBeEnabled();
  });

  it('should have correct page size value', () => {
    const { value: pageSizeValue } =
      fixtureHostComponent.nativeElement.querySelector(
        '[data-testid=page-size-input]'
      );

    expect(parseInt(pageSizeValue)).toBe(5);

    expectNoOfRowsToBe(5);
  });

  it('should be able to navigate between pages', () => {
    // navigate to next page
    const nextButton: DebugElement = fixtureHostComponent.debugElement.query(
      By.css('[data-testid=next-button]')
    );

    nextButton.triggerEventHandler('click', null);
    fixtureHostComponent.detectChanges();

    expectCurrentPageToBe(2);
    expectPrevButtonToBeEnabled();
    expectNextButtonToBeDisabled();
    expectNoOfRowsToBe(3);

    // navigate to prev page
    const prevButton: DebugElement = fixtureHostComponent.debugElement.query(
      By.css('[data-testid=prev-button]')
    );

    prevButton.triggerEventHandler('click', null);
    fixtureHostComponent.detectChanges();

    expectCurrentPageToBe(1);
    expectPrevButtonToBeDisabled();
    expectNextButtonToBeEnabled();
    expectNoOfRowsToBe(5);
  });

  it('should display all data when page size is null', fakeAsync(() => {
    fixtureHostComponent.componentInstance.pageSize = null;
    fixtureHostComponent.detectChanges();

    tick(300);

    fixtureHostComponent.detectChanges();
    expectNoOfRowsToBe(8);
  }));

  it('should allow to sort sortable columns and not allow to sort unsortable columns', () => {
    const sortButtons: DebugElement[] =
      fixtureHostComponent.debugElement.queryAll(
        By.css('[data-testid=sort-button]')
      );

    const [firstButton, secondButton] = sortButtons.map(
      (sortButton) => sortButton.nativeElement
    );

    expectButtonToBeEnabled(firstButton);
    expectButtonToBeDisaled(secondButton);
  });

  it('should sort first column', () => {
    const firstColumnSortButton = fixtureHostComponent.debugElement.query(
      By.css('[data-testid=sort-button]')
    );

    // sort ascendent
    firstColumnSortButton.triggerEventHandler('click', null);
    fixtureHostComponent.detectChanges();

    const cols = fixtureHostComponent.nativeElement.querySelectorAll(
      '[data-testid=table-row] td:is(:first-of-type)'
    );

    const firstColumnValuesAscendent = [
      ...fixtureHostComponent.nativeElement.querySelectorAll(
        '[data-testid=table-row] td:is(:first-of-type)'
      ),
    ].map((node) => parseInt(node.textContent));

    // expect displayed rows to be sorted ascendent by id
    expect(firstColumnValuesAscendent).toEqual([1, 2, 3, 4, 5]);

    // sort descendent
    firstColumnSortButton.triggerEventHandler('click', null);
    fixtureHostComponent.detectChanges();

    const firstColumnValuesDescendent = [
      ...fixtureHostComponent.nativeElement.querySelectorAll(
        '[data-testid=table-row] td:is(:first-of-type)'
      ),
    ].map((node) => parseInt(node.textContent));

    // expect displayed rows to be sorted descendent by id
    expect(firstColumnValuesDescendent).toEqual([8, 7, 6, 5, 4]);
  });

  it('should emit event on pagination change', () => {
    const datagridComponentInstance: DataGridComponent<TestDataModel> =
      fixtureHostComponent.debugElement.query(
        By.directive(DataGridComponent)
      ).componentInstance;

    spyOn(datagridComponentInstance.paginationChange, 'emit').and.callThrough();
    spyOn(
      fixtureHostComponent.componentInstance,
      'handlePaginationChange'
    ).and.callThrough();

    const nextButton: DebugElement = fixtureHostComponent.debugElement.query(
      By.css('[data-testid=next-button]')
    );

    nextButton.triggerEventHandler('click', null);
    fixtureHostComponent.detectChanges();

    expect(
      datagridComponentInstance.paginationChange.emit
    ).toHaveBeenCalledTimes(1);
    expect(
      fixtureHostComponent.componentInstance.handlePaginationChange
    ).toHaveBeenCalledTimes(1);
    expect(
      fixtureHostComponent.componentInstance.handlePaginationChange
    ).toHaveBeenCalledWith({ currentPage: 2, pageSize: 5 });
  });

  it('should emit event on sort change', () => {
    const datagridComponentInstance: DataGridComponent<TestDataModel> =
      fixtureHostComponent.debugElement.query(
        By.directive(DataGridComponent)
      ).componentInstance;

    spyOn(datagridComponentInstance.sortChange, 'emit').and.callThrough();
    const handleSortChangeSpy = spyOn(
      fixtureHostComponent.componentInstance,
      'handleSortChange'
    );

    const firstColumnSortButton = fixtureHostComponent.debugElement.query(
      By.css('[data-testid=sort-button]')
    );

    firstColumnSortButton.triggerEventHandler('click', null);
    firstColumnSortButton.triggerEventHandler('click', null);
    fixtureHostComponent.detectChanges();

    expect(datagridComponentInstance.sortChange.emit).toHaveBeenCalledTimes(2);
    expect(
      fixtureHostComponent.componentInstance.handleSortChange
    ).toHaveBeenCalledTimes(2);

    expect(handleSortChangeSpy.calls.allArgs()).toEqual([
      [{ columnName: 'Id', direction: Direction.ASCENDENT }],
      [{ columnName: 'Id', direction: Direction.DESCENDENT }],
    ]);
  });
});
