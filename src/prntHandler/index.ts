import robot from 'robotjs';
import Jimp from 'jimp';

export const prntHandler = async (command: string): Promise<string> => {
  let { x, y } = robot.getMousePos();
  let size = 200;
  let img = robot.screen.capture(x - size/2, y - size/2, size, size);
  img.image.forEach((buff: Buffer, i: number) => {
    if (i % 4 === 0) {  
      return [img.image[i], img.image[i + 2]] = [img.image[i + 2],img.image[i]]
    }
  });
  const jimp = new Jimp({ data: img.image, width: img.width, height: img.height });
  const base64Image = await jimp.getBase64Async(Jimp.MIME_PNG);
  const image = base64Image.split(',')[1];
  return `${command} ${image}`;
}
