export interface SmartG4TableState<T> {
  filter: string;
  order: 'asc' | 'desc';
  orderBy?: keyof T;
  page: number;
  rowsPerPage: number;
  selected: string[];
}