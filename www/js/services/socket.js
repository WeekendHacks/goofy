app.factory('socket',function(socketFactory){
  //Create socket and connect to http://chat.socket.io 
  var myIoSocket = io.connect('http://goofy-web.cloudapp.net');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
});