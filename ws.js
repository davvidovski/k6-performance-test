import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
      console.log('connected');

      socket.setInterval(function timeout() {
        socket.ping();
        console.log('Pinging every 1sec (setInterval test)');
      }, 1000);
    });

    socket.on('ping', () => console.log('PING!'));
    socket.on('pong', () => console.log('PONG!'));
    socket.on('close', () => console.log('disconnected'));
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}