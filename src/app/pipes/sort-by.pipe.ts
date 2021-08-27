import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book.model';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(array: Book[], args: any[]): Book[] {
    if (array) {
      let sortField = args[0];
      let sortDirection = args[1];
      let modifier = 1;

      if (sortDirection === 'desc') {
        modifier = -1;
      }

      array.sort((a, b) => {
        let firstElement: any;
        let secondElement: any;

        // If we compare numbers
        if (typeof a[sortField] === 'number') {
          firstElement = a[sortField];
          secondElement = b[sortField];
        }

        // If we have strings
        if (typeof a[sortField] === 'string') {
          firstElement = a[sortField].toLowerCase();
          secondElement = b[sortField].toLowerCase();

          // German special chars
          if (sortField === 'title') {
            return firstElement.localeCompare(secondElement);
          }
        }

        if (firstElement < secondElement) {
          return -1 * modifier;
        } else if (firstElement > secondElement) {
          return 1 * modifier;
        } else {
          return 0;
        }
      });
    }

    return array;
  }
}
