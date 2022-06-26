# Websocket Remote Control
## Description
  implementation remote control backend using RobotJS library and websocket

  The backend can do the following:

- Start websocket server
- Handle websocket connection
- Move mouse - key(Up, Down, Left, Right)
- Draw circle, rectangle and square - key(c, r, s);  
- Send current mouse coordinates - key(p);
- Send desktop capture - key(ctr + p);
### How to install app
  - ```git clone: https://github.com/Nick1091/remote-control.git```
  - Select develop branch
  - ```npm i```
### Scripts 
 - ```npm run dev``` -> The application is run in development mode using nodemon
 - ```npm run start:dev``` -> The application is run in development mode using nodemon
 - ```npm run start``` -> The application is run in production mode, starts the build process with typescript and then runs the linked file
