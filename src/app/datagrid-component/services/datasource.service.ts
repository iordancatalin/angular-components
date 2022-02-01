import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ColumnConfiguration } from '../datagrid/column/column.model';
import { CarModel, datasourceCars } from './datasourceCars';

@Injectable()
export class DatasourceService {
  constructor() {}

  private carsDatasourceColumns: ColumnConfiguration<CarModel>[] = [
    {
      name: 'Id',
      property: 'id',
      sortable: true,
    },
    {
      name: 'Car Mark',
      property: 'carMark',
      sortable: true,
    },
    {
      name: 'Car Model',
      property: 'carModel',
      sortable: true,
    },
    {
      name: 'Car Model Year',
      property: 'carModelYear',
      sortable: true,
    },
    {
      name: 'Car Vin',
      property: 'carVin',
      sortable: true,
    },
    {
      name: 'Owner Fullname',
      property: 'ownerFullName',
      sortable: true,
    },
    {
      name: 'Price',
      property: 'price',
      sortable: true,
    },
  ];

  public get datasourceCars(): CarModel[] {
    return datasourceCars;
  }

  public get datasourceCars$(): Observable<CarModel[]> {
    return of(datasourceCars);
  }

  public getColumnsForCarsDatasource(): ColumnConfiguration<CarModel>[] {
    return this.carsDatasourceColumns;
  }
}
