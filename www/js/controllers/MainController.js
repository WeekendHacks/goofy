app.controller('MainController',function($scope,socket) {
  var self=this;
  
  socket.on('connect',function(){
    self.play = function(){
      console.log("Hello");
      
      //Add user called nickname
        socket.emit('mood',"Sex");

    }

    self.stop = function(){
        socket.emit('stop',"Stop");
    }

    socket.on('track',function(data){
           // window.open(data.track, '_system');
      $scope.audio = new Audio();
      $scope.audio.src = data.track;
      // self.audio.src = data.track;
      $scope.audio.play();
      $scope.audio.stop();
      setTimeout(function(){
        $scope.audio.play();
      }, 1000);
    }); 

    socket.on('stop_track',function(data){
      // if(self.audio){
      //   self.audio.pause();
      // }
      $scope.audio.pause();
      $scope.audio.currentTime = 0;
    });

  });  
  
});