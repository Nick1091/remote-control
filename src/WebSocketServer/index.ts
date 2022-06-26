import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import { mouseHandler } from '../mouseCommands';
import { drawHandler } from '../drawCommands';
import { prntHandler } from '../prntHandler';

export const connectServer = (wss: WebSocketServer) => {
  wss.on('connection', (ws: WebSocket) => {
    const duplex = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false});
    duplex.on('data', async (chunk) => {
      console.log(`Received from front: ${chunk}`);
      const [command, value, rest] = chunk.split(' ');
      const sepCommand = command.split('_')[0];
      try{
        let resp: string = '';
        switch (sepCommand) {
          case 'mouse' :{
            resp = await mouseHandler(command, value);
            break
          }
          case 'draw' :{
            resp = await drawHandler(command, value, rest);
            break
          }
          case 'prnt' :{
            resp = await prntHandler(command);
            break
          }
          default : {
            console.log('Error: unknown command')
            break
          }
        }
        duplex.write(`${resp}\0`, 'utf8');
        console.log(`Result: ${resp} completed successfully`)
      } catch {
        console.log("Error: something went wrong");
      }
    })
    duplex.on('error', () => {
      console.log("Error: something went wrong");
    })
  })
  process.on('SIGINT', async () => {
    process.stdout.write('WebSocketServer closed!\n')
    process.exit();
  });
  wss.on('close', () => {
    process.stdout.write('WebSocketServer closed!\n')
    process.exit();
  })
}
