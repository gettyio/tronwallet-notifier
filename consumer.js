import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3030');
socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
socket.on('payback', (data) => {

  console.log(data);
  if (data.uuid) {
    if (data.succeeded) {
      // this.props.history.replace("/success");
    } else {
      // this.props.history.replace('/failure');
    }
  }
});

socket.on('error', (error) => {
  console.error(error);
});
