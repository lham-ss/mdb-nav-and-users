import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  testSocket() {
    this.socket.emit('ws-test', { data1: 'one', data2: 'two' });
  }

  onTestSocket() {
    return this.socket.fromEvent('ws-test');
  }


}
