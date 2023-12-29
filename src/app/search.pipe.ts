// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'search',
// })
// export class SearchPipe implements PipeTransform {
//   transform(items: string[], searchText: string): string[] {
//     if (!items || !searchText) {
//       return items;
//     }

//     searchText = searchText.toLowerCase();

//     return items.filter((task) => task.toLowerCase().includes(searchText));
//   }
// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      return item.name.toLowerCase().includes(searchText);
    });
  }
}
