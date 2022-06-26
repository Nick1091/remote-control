import robot from 'robotjs';

export const mouseHandler = async (command: string, value: string): Promise<string> => {
  let commandToWrite: string = '';
  const { x, y } = robot.getMousePos();
  switch(command) {
    case 'mouse_up':  {
      robot.moveMouse(x, y - +value);
      commandToWrite = command;
      break
    }
    case 'mouse_left':  {
      robot.moveMouse(x - +value, y);
      commandToWrite = command;
      break
    }
    case 'mouse_down':  {
      robot.moveMouse(x, y + +value);
      commandToWrite = command;
      break
    }
    case 'mouse_right':  {
      robot.moveMouse(x + +value, y);
      commandToWrite = command;
      break
    }
    case 'mouse_position':  {
      commandToWrite = `${command} ${x},${y}`;
      break
    }
    default : {
      console.log('Error: unknown command')
      break
    }
  }
  return commandToWrite;
}
