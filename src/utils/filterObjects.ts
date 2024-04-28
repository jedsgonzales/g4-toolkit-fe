import { filter } from 'lodash'

// ----------------------------------------------------------------------

/*
function descendingComparator(a: any, b: any, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
*/

export function applySortFilter(array: any, comparator: Function, queryBy: string, query: string) {
  const stabilizedThis = array.map((el: HTMLBaseElement, index: number) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (row) => row[queryBy].toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el: any) => el[0]);
}

//const filteredObjects = applySortFilter(projects, getComparator('asc', 'name'), filterName);