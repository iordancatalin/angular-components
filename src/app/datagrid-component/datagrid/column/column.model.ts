export interface ColumnConfiguration<T> {
  name: string;
  property: keyof T;
  sortable: boolean;
}
