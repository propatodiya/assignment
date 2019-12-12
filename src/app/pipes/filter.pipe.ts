import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (searchText !== undefined) {
        localStorage.setItem('search', searchText);
    }
    if (!items) { return []; }
    if (!searchText) {
        return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
        const search = it.name.toLowerCase();
        const description = it.description.toLowerCase();
        return search.includes(searchText) ? it : description.includes(searchText) ? it : null;
    });
   }
}
