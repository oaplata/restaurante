import { Pipe, PipeTransform } from '@angular/core';
import { TranslateProvider } from '../../providers/translate/translate';

/**
 * Generated class for the TranslatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(private tranlateProvider: TranslateProvider) {

  }
  
  async transform(value: string) {
    return await this.tranlateProvider.translateText(value);
  }
}
