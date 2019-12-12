import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {
  transform(items: any[], limit: any): any[] {
    if (!items) { return []; }
    if (!limit) { return items; }
    if (limit !== 'All'){
        return items.slice(0, limit);
    } else {
        return items;
    }
   }
}
