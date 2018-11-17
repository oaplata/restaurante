import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the TranslateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TranslateProvider {
  private key = "trnsl.1.1.20181116T204319Z.78d7712506be0767.f14fd6e7d284e0de31e98b6c240c1d6038db2afd";
  private baseURL = "https://translate.yandex.net/api/v1.5/tr.json/";
  private target = "en";
  constructor(public http: HttpClient) {
    console.log('Hello TranslateProvider Provider');
  }

  async translateText(text: string) {
    const lang = await this.detectLang(text);
    const result: any = await this.http.get(`${this.baseURL}translate?key=${this.key}&text=${text}&lang=${lang}-${this.target}`).first().toPromise();
    return result.text[0];
  }

  async detectLang(text: string) {
    const result: any = await this.http.get(`${this.baseURL}detect?key=${this.key}&text=${text}`).first().toPromise();
    return result.lang;
  }

}
