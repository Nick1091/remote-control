import Jimp from 'jimp';
import {httpServer} from './src/http_server/index';
import robot from 'robotjs';
import { createWebSocketStream, WebSocketServer } from 'ws';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws) => {
  const duplex = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false});
  duplex.on('data', async (chunk) => {
    console.log(chunk);
    const [command, value, rest] = chunk.split(' ');
    if (command === 'mouse_position') {
      const { x, y } = robot.getMousePos();
      const message = `mouse_position ${x},${y}`
      duplex.write(message, 'utf8');
    }
    if (command === 'mouse_up') {
      const { x, y } = robot.getMousePos();
      robot.moveMouse(x, y - +value);
      duplex.write(`${command}\0`, 'utf8');
    }
    if (command === 'mouse_left') {
      const { x, y } = robot.getMousePos();
      robot.moveMouse(x - +value, y);
      duplex.write(`${command}\0`, 'utf8');
    }
    if (command === 'mouse_down') {
      const { x, y } = robot.getMousePos();
      robot.moveMouse(x, y + +value);
      duplex.write(`${command}\0`, 'utf8');
    }
    if (command === 'mouse_right') {
      const { x, y } = robot.getMousePos();
      robot.moveMouse(x + +value, y);
      duplex.write(`${command}\0`, 'utf8');
    }
    if (command === 'mouse_position') {
      const { x, y } = robot.getMousePos();
      duplex.write(`${command} ${x},${y}\0`, 'utf8');
    }
    if (command === 'draw_circle') {
      const mousePos = robot.getMousePos();
      robot.mouseToggle("down")
      for (let i = 0; i <= Math.PI * 2; i += 0.02) {
        const x = mousePos.x + value * Math.cos(i) - value;
        const y = mousePos.y + value * Math.sin(i);
        robot.dragMouse(x, y);
      }
      robot.mouseToggle("up")

      duplex.write(`${command}\0`, 'utf8');
    }
    if (command === 'draw_square') {
      let { x, y } = robot.getMousePos();
      robot.mouseToggle('down');
      x += +value;
      robot.moveMouseSmooth(x, y);
      y += +value;
      robot.moveMouseSmooth(x - 2, y);
      x -= +value + 2;
      robot.moveMouseSmooth(x, y - 2);
      y -= +value + 2;
      robot.moveMouseSmooth(x + 2, y);
      robot.mouseToggle('up');
      duplex.write(`${command} ${x},${y}\0`, 'utf8');
    }
    if (command === 'draw_rectangle') {
      let { x, y } = robot.getMousePos();
      robot.mouseToggle('down');
      x += +value;
      robot.moveMouseSmooth(x, y);
      y += +rest;
      robot.moveMouseSmooth(x - 2, y);
      x -= +value + 2;
      robot.moveMouseSmooth(x, y - 2);
      y -= +rest + 2;
      robot.moveMouseSmooth(x + 2, y);
      robot.mouseToggle('up');
      duplex.write(`${command} ${x},${y}\0`, 'utf8');
    }
    if (command === 'prnt_scrn') {
      let { x, y } = robot.getMousePos();
      let size = 200;
      try {
        let img = robot.screen.capture(x - size/2, y - size/2, size, size);
        img.image.forEach((buff: Buffer, i: number) => {
          if (i % 4 === 0) {  
            return [img.image[i], img.image[i + 2]] = [img.image[i + 2],img.image[i]] // bgr -> rgb color
          }
        });
        const jimp = new Jimp({ data: img.image, width: img.width, height: img.height });
        const base64Image = await jimp.getBase64Async(Jimp.MIME_PNG);
        const image = base64Image.split(',')[1];
        duplex.write(`${command} ${image}\0`);
      } catch (error) {
        console.log(error);
      }
    }
  })
})

wss.on('close', () => {})
