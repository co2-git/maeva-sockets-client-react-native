import Client from 'maeva-sockets-client';
import {WebSocket} from 'react-native';

export default class MaevaSockets_NodeClient extends Client {
  constructor(url) {
    const client = new WebSocket(url);
    client.on = (event, cb) => {
      console.log({event});
      switch (event) {
      case 'message':
        client.onmessage = (messageEvent) => {
          return cb(messageEvent.data);
        };
        break;
      case 'open':
        client.onopen = cb;
        break;
      case 'error':
        client.onerror = cb;
        break;
      }
    };
    super(client);
  }
}
