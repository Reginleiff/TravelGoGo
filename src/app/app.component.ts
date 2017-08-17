import { Component } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(
    // private flashMessagesService: FlashMessagesService
  ){ }

  // flashMessage(message: string): void {
  //   this.flashMessagesService.show(message,
  //   {cssClass: 'alert-success', timeout: 8000}
  //   );
  // }
}
