import { Injectable } from '@angular/core';
import { BotService } from './bot.service';
import { ResponseDataModel } from '../models/response-data-model';
import { Subject } from 'rxjs';
import { SpeechService } from './speech.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  botResponses: ResponseDataModel[] = [
    new ResponseDataModel('age', 'I was made on 11/05/2019'),
    new ResponseDataModel('user_age', 'You have not told me how old you are'),
    new ResponseDataModel('name', 'My name is Botty McBotface'),
    new ResponseDataModel('user_name', 'You have not told me your name yet'),
    new ResponseDataModel('unicorn_age', 'Unicorns can live for 60 80 90 60 years'),
    new ResponseDataModel('unicorn_where', 'Unicorns often can be found in Canada'),
    new ResponseDataModel('unicorn_color', 'Unicorns come in many colors. Often pink and rainbow, but not with white spots'),
    new ResponseDataModel('unicorn_real', 'Though many people do not believe, unicorns are very real'),
    new ResponseDataModel('joke', 'What did the unicorn call her daddy? Pop Corn'),
    new ResponseDataModel('unicorn_poop', 'Unicorns do not often poop. When they do it smells like baked cupcakes.'),
    new ResponseDataModel('unicorn_picture', 'Here is a picture of a unicorn')
  ];

  responseForBot: string = '';
  responseForBotSub: Subject<string> = new Subject<string>();
  isPicture: boolean = false;
  isPictureSub: Subject<boolean> = new Subject<boolean>();

  constructor( private speechService: SpeechService) { }

  getResponseForBot(value: string) {
    for (let i = 0; i < this.botResponses.length; i++) {
      if (this.botResponses[i].value == value) {
        this.checkForPicture(value);
        this.responseForBot = this.botResponses[i].message;
        break;
      }
    }
    this.responseForBotSub.next(this.responseForBot);
    this.speechService.onSpeech(this.responseForBot);
  }

  checkForPicture(value: string) {
    if (value == 'unicorn_picture') {
      this.isPicture = true;
    }
    else {
      this.isPicture = false;
    }
    this.isPictureSub.next(this.isPicture);
  }
}
