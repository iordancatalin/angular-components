import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnComponent } from './column.component';

type TestDataModel = { firstName: string };

describe('ColumnComponent', () => {
  let component: ColumnComponent<TestDataModel>;
  let fixture: ComponentFixture<ColumnComponent<TestDataModel>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture =
      TestBed.createComponent<ColumnComponent<TestDataModel>>(
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
