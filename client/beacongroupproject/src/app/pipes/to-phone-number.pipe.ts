import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'toPhoneNumber'
})
export class ToPhoneNumberPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {

    console.log("value", value);
    return value;
  }

}
