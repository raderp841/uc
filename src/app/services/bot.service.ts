import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Subject } from 'rxjs';
import { ResponseService } from './response.service';
import { JsonResponse } from '../models/json-response';


@Injectable({
  providedIn: 'root'
})
export class BotService {

  private readonly uri = 'https://api.wit.ai/message?v=20191105&q=';
  responseSub: Subject<string> = new Subject<string>();
  response: string = '';

  constructor(private http: HttpClient, private responseService: ResponseService) { }

  getBotResponse(input: string) {
    let params: HttpParams = new HttpParams().set('q', input).set('access_token', 'ZQWRE6DMP4NEITYYDVEJNJ6JG7QLRBFG')

    let response = this.http.get(this.uri, { params })
      .subscribe((res: JsonResponse) => {
        this.response = res.entities['intent'][0].value;
        this.responseService.getResponseForBot(this.response);
      });    
  }
  getDataFromResponse(response: {}) {
    console.log(response);
  }
}
