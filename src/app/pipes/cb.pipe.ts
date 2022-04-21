import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cb'
})
export class CbPipe implements PipeTransform {

  transform(value: string, n: number = 4) { //4 est la valeur par défaut
    return value.slice(0, n) + ' ' + Array(value.length - (2 * n)).join("X") + ' ' + value.slice(-n, value.length);
  }

}
