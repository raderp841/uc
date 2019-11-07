import { Injectable } from '@angular/core';

import {
  SpeechSynthesisUtteranceFactoryService,
  SpeechSynthesisService,
} from '@kamiazya/ngx-speech-synthesis';
import {
  RxSpeechRecognitionService,
  resultList,
} from '@kamiazya/ngx-speech-recognition';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  speechMessage: string = '';
  isSpeech: boolean = false;
  speechMessageSub: Subject<string> = new Subject<string>();
  isSpeechSub: Subject<boolean> = new Subject<boolean>();

  constructor(public f: SpeechSynthesisUtteranceFactoryService,
    public svc: SpeechSynthesisService, public speechRecService: RxSpeechRecognitionService, ) { }

  onSpeech(botResponse: string) {

  //  let arr = this.botResponse.split(' ');
    let v = this.f.text(botResponse);
    this.svc.speak(v);
  }

  onListen() {
    this.speechRecService
      .listen()
      .pipe(resultList)
      .subscribe((list: SpeechRecognitionResultList) => {
        this.speechMessage = list.item(0).item(0).transcript;
        //console.log('RxComponent:onresult', this.speechMessage, list);
        this.speechMessageSub.next(this.speechMessage);
      });
    this.isSpeech = true;
    this.isSpeechSub.next(this.isSpeech);
  }
}
