import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


import { BotService } from '../services/bot.service';
import { Subscription } from 'rxjs';
import { ResponseService } from '../services/response.service';
import { SpeechService } from '../services/speech.service';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit, OnDestroy {

  botForm: FormGroup;
  botResponse: string = '';
  botResponseSub: Subscription = new Subscription();
  speechMessage: string = '';
  speechMessageSub: Subscription = new Subscription();
  isSpeech: boolean = false;
  isSpeechSub: Subscription = new Subscription();
  isPicture: boolean = false;
  isPictureSub: Subscription = new Subscription();

  constructor(private botService: BotService, private responseService: ResponseService, private speechService: SpeechService) { }


  ngOnInit() {
    this.setUpForm();
    this.botResponseSub = this.responseService.responseForBotSub
      .subscribe(r => this.botResponse = r);
    this.speechMessageSub = this.speechService.speechMessageSub
      .subscribe(sm => this.speechMessage = sm);
    this.isSpeechSub = this.speechService.isSpeechSub
      .subscribe(is => this.isSpeech = is);
    this.isPictureSub = this.responseService.isPictureSub
      .subscribe(p => this.isPicture = p);
  }

  setUpForm() {
    this.botForm = new FormGroup({
      'input': new FormControl('')
    });
  }

  resetForm() {
    this.botForm.reset();
  }

  onSubmit() {
    if (this.isSpeech) {
      this.botService.getBotResponse(this.speechMessage);
    }
    else {
      this.botService.getBotResponse(this.botForm.controls['input'].value);
    }
    this.resetForm();
  }  

  onListen() {

    this.speechService.onListen();
  }

  ngOnDestroy() {
    this.botResponseSub.unsubscribe();
    this.isSpeechSub.unsubscribe();
    this.speechMessageSub.unsubscribe();
    this.isPictureSub.unsubscribe();
  }

}
