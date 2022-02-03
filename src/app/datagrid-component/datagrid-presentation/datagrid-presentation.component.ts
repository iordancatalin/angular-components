import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnConfiguration } from '../datagrid/column/column.model';
import {
  PaginationChangeEvent,
  SortChangeEvent,
} from '../datagrid/datagrid.model';
import { DatasourceService } from '../services/datasource.service';
import { CarModel } from '../services/datasourceCars';

type DataType = CarModel[] | Observable<CarModel[]>;
type CheckableColum = ColumnConfiguration<CarModel> & { checked: boolean };

@Component({
  selector: 't-datagrid-presentation',
  templateUrl: './datagrid-presentation.component.html',
  styleUrls: ['./datagrid-presentation.component.scss'],
})
export class DataGridPresentationComponent implements OnInit {
  public myData!: DataType;

  public columns!: ColumnConfiguration<CarModel>[];
  public checkableColumns: CheckableColum[] = [];
  public pageSize: number | null = 5;

  constructor(private datasourceService: DatasourceService) {}

  ngOnInit(): void {
    this.myData = this.datasourceService.datasourceCars$;
    // this.myData = this.datasourceService.datasourceCars; // uncomment this line to use an array as data

    this.columns = this.datasourceService.getColumnsForCarsDatasource();

    this.checkableColumns = this.columns.map((column) => ({
      ...column,
      checked: true,
    }));
  }

  public get visibleColumns(): ColumnConfiguration<CarModel>[] {
    return this.checkableColumns.filter((column) => column.checked === true);
  }

  public handleSortChange(sortChangeEvent: SortChangeEvent): void {
    console.log('Sort change event emitted with payload', sortChangeEvent);
  }

  public handlePaginationChange(
    paginationChangeEvent: PaginationChangeEvent
  ): void {
    console.log(
      'Pagination change event emitted with payload',
      paginationChangeEvent
    );
  }
}
