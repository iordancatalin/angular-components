import { TestBed } from '@angular/core/testing';
import { Direction } from '../datagrid/datagrid.model';

import { SortService } from './sort.service';

type TestDataModel = {
  id: number;
  name: string;
  date: Date;
};

type TestDataModelKey = keyof TestDataModel;

const unsortedData: TestDataModel[] = [
  { id: 3, name: 'Billy', date: new Date(2022, 2, 3) },
  { id: 1, name: 'Anna', date: new Date(2022, 2, 2) },
  { id: 2, name: 'Viktor', date: new Date(2022, 2, 1) },
];

const sortedDataAscendentById: TestDataModel[] = [
  { id: 1, name: 'Anna', date: new Date(2022, 2, 2) },
  { id: 2, name: 'Viktor', date: new Date(2022, 2, 1) },
  { id: 3, name: 'Billy', date: new Date(2022, 2, 3) },
];

const sortedDataDescendentById: TestDataModel[] = [
  ...sortedDataAscendentById,
].reverse();

const sortedDataAscendentByName: TestDataModel[] = [
  { id: 1, name: 'Anna', date: new Date(2022, 2, 2) },
  { id: 3, name: 'Billy', date: new Date(2022, 2, 3) },
  { id: 2, name: 'Viktor', date: new Date(2022, 2, 1) },
];

const sortedDataDescendentByName: TestDataModel[] = [
  ...sortedDataAscendentByName,
].reverse();

const sortedDataAscendentByDate: TestDataModel[] = [
  { id: 2, name: 'Viktor', date: new Date(2022, 2, 1) },
  { id: 1, name: 'Anna', date: new Date(2022, 2, 2) },
  { id: 3, name: 'Billy', date: new Date(2022, 2, 3) },
];

const sortedDataDescendentByData: TestDataModel[] = [
  ...sortedDataAscendentByDate,
].reverse();

describe('SortService', () => {
  let service: SortService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SortService] });
    service = TestBed.inject(SortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort data ascendent by id', () => {
    const actualData = service.sortByProperty<TestDataModel, TestDataModelKey>(
      unsortedData,
      'id',
      Direction.ASCENDENT
    );

    expect(actualData).toEqual(sortedDataAscendentById);
  });

  it('should sort data descendent by id', () => {
    const actualData = service.sortByProperty<TestDataModel, TestDataModelKey>(
      unsortedData,
      'id',
      Direction.DESCENDENT
    );

    expect(actualData).toEqual(sortedDataDescendentById);
  });

  it('should sort data ascendent by name', () => {
    const actualData = service.sortByProperty<TestDataModel, TestDataModelKey>(
      unsortedData,
      'name',
      Direction.ASCENDENT
    );

    expect(actualData).toEqual(sortedDataAscendentByName);
  });

  it('should sort data descendent by name', () => {
    const actualData = service.sortByProperty<TestDataModel, TestDataModelKey>(
      unsortedData,
      'name',
      Direction.DESCENDENT
    );

    expect(actualData).toEqual(sortedDataDescendentByName);
  });

  it('should sort data ascendent by date', () => {
    const actualData = service.sortByProperty<TestDataModel, TestDataModelKey>(
      unsortedData,
      'date',
      Direction.ASCENDENT
    );

    expect(actualData).toEqual(sortedDataAscendentByDate);
  });

  it('should sort data descendent by date', () => {
    const actualData = service.sortByProperty<TestDataModel, TestDataModelKey>(
      unsortedData,
      'date',
      Direction.DESCENDENT
    );

    expect(actualData).toEqual(sortedDataDescendentByData);
  });
});
