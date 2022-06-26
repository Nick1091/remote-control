import robot from 'robotjs';

export const drawHandler = async (command: string, value: string, rest: string): Promise<string> => {
  const mousePos = robot.getMousePos();
  switch(command) {
    case 'draw_circle':  {
      robot.mouseToggle("down")
      for (let i = 0; i <= Math.PI * 2; i += 0.02) {
        const x = mousePos.x + +value * Math.cos(i) - +value;
        const y = mousePos.y + +value * Math.sin(i);
        robot.dragMouse(x, y);
      }
      robot.mouseToggle("up")
      break
    }
    case 'draw_square':  {
      let { x, y } = mousePos;
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
      break
    }
    case 'draw_rectangle':  {
      let { x, y } = mousePos;
      robot.mouseToggle('down');
      x += +value;
      robot.moveMouseSmooth(x, y);
      y += +rest;
      robot.moveMouseSmooth(x - 2, y);
      x -= +value + 2;
      robot.moveMouseSmooth(x, y - 2);
      y -= +rest + 2;
      robot.moveMouseSmooth(x + 2, y);
      robot.mouseToggle('up');;
      break
    }
    default : {
      console.log('Error: unknown command')
      break
    }
  }
  return command;
}
