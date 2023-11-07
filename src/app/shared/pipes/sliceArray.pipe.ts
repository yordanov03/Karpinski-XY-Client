import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceArray'
})
export class SliceArrayPipe implements PipeTransform {
  transform(items: any[], sliceSize: number): any[] {
    let result = [];
    for (let i = 0; i < items.length; i += sliceSize) {
      result.push(items.slice(i, i + sliceSize));
    }
    return result;
  }
}
