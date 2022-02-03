import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnComponent } from './column.component';

type TestDataModel = { firstName: string };
type TestDataModelKey = keyof TestDataModel;

describe('ColumnComponent', () => {
  let component: ColumnComponent<TestDataModelKey>;
  let fixture: ComponentFixture<ColumnComponent<TestDataModelKey>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture =
      TestBed.createComponent<ColumnComponent<TestDataModelKey>>(
        ColumnComponent
      );
    component = fixture.componentInstance;

    component.name = 'First name';
    component.property = 'firstName';
    component.sortable = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
