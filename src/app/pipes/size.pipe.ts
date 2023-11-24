import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size',
  standalone: true
})
export class SizePipe implements PipeTransform {


  transform(size: string, ...args: unknown[]): string {
    let sizeAsNumber = Number(size);

    if (isNaN(sizeAsNumber)) {
      return 'Invalid size';
    }

    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;

    while (sizeAsNumber >= 1024) {
      sizeAsNumber /= 1024;
      ++i;
    }

    return `${sizeAsNumber.toFixed(2)} ${units[i]}`;
  }

}
