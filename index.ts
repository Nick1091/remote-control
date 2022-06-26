import { WebSocketServer } from 'ws';
import {httpServer} from './src/http_server/index';
import { connectServer } from './src/WebSocketServer';

const HTTP_PORT = 3000;
const WebSocket_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WebSocket_PORT })

connectServer(wss);
