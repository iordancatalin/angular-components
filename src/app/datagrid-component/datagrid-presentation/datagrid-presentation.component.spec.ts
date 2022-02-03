import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColumnComponent } from '../datagrid/column/column.component';
import { DataGridComponent } from '../datagrid/datagrid.component';
import { DatasourceService } from '../services/datasource.service';
import { SortService } from '../services/sort.service';

import { DataGridPresentationComponent } from './datagrid-presentation.component';

describe('DataGridPresentationComponent', () => {
  let component: DataGridPresentationComponent;
  let fixture: ComponentFixture<DataGridPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [DatasourceService, SortService],
      declarations: [DataGridPresentationComponent, DataGridComponent, ColumnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
