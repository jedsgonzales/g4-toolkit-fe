import { filter } from 'lodash'
import { number } from 'yup';

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

export const filterMatch = (value: unknown, filter: string): boolean => {
  if(!filter){
    return true;
  }

  let isMatch = false;

  if (typeof value === 'string'){
    isMatch = (value as string).toLowerCase().includes(filter);

  } else if (typeof value === 'number'){
    isMatch = (value as number).toString().toLowerCase().includes(filter);

  } else if (typeof value === 'boolean'){
    isMatch = (value as boolean ? 'true' : 'false').toLowerCase().includes(filter);

  } else if (Array.isArray(value)){
    isMatch = (value as Array<unknown>).map((val) => filterMatch(val, filter)).reduce((p, c) => (p && c), true);

  } else {
    // maybe an object
    try {
      const obj = JSON.parse(JSON.stringify(value));
      for(const itemKey in obj){
        isMatch &&= filterMatch(obj[itemKey], filter);
      }
    } catch (err) {
      isMatch = (value as any).toString().toLowerCase().includes(filter);
    }
  }

  return isMatch;
}

export const collectionFilter = <T>(collection: T[], textFilter: string) => {
  return collection.filter((item) => filterMatch(item, textFilter.toLowerCase()));
}
