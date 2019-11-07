import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import {
  SpeechSynthesisModule,
} from '@kamiazya/ngx-speech-synthesis';
import {
  SpeechRecognitionModule,
  RxSpeechRecognitionService
} from '@kamiazya/ngx-speech-recognition';

import { AppComponent } from './app.component';
import { BotComponent } from './bot/bot.component';

@NgModule({
  declarations: [
    AppComponent,
    BotComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SpeechSynthesisModule.forRoot({
      lang: 'en',
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
    }),
    SpeechRecognitionModule.withConfig({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 10,
    }),
  ],
  providers: [RxSpeechRecognitionService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
