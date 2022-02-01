export interface PaginationChangeEvent {
  currentPage: number;
  pageSize: number | null;
}

export enum Direction {
  ASCENDENT = 'ASCENDENT',
  DESCENDENT = 'DESCENDENT',
}

export interface SortChangeEvent {
  columnName: string;
  direction: Direction;
}

export interface SortState<T> {
  sortByColumn: string;
  property: keyof T;
  direction: Direction;
}
