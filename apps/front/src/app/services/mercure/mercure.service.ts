import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MercureService {

  private sourceMessage = 'http://127.0.0.1:8080/.well-known/mercure?topic=https://api.skillswap.wip/api/messages';

  constructor() { }

  // Get message updates

  getUpdatedMessage(sourceMessage: EventSource): Observable<MessageEvent> {
    return new Observable<MessageEvent>(subscriber => {
      const updateMessage = sourceMessage;

      updateMessage.onmessage = event =>  console.log(subscriber.next(event));
      updateMessage.onerror = event => console.log(subscriber.error(event));
    });
  }

  getSourceMessage() {
    const sourceMessage = new EventSource(this.sourceMessage);

    return sourceMessage;
  }
}
