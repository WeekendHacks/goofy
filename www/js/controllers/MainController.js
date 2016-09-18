app.controller('MainController',function($scope,socket) {
  var self=this;

  socket.on('connect',function(){
    $scope.audio = new Audio();
    $scope.latency = 0;

    socket.on('ping',function(data){
      socket.emit('ponged_new',{ 'time' : data.time , 'ctime': Date.now()});
    });

    socket.on('ponged_reply',function(data){
      if(data.ctime){
        var single = (Date.now() - data.ctime)/2;
        if($scope.latency != 0){
          $scope.latency = ($scope.latency + single)/2;
        }
        else{
          $scope.latency = single;        
        }
        console.log($scope.latency);
      }
    });

    self.play = function(){
      //Add user called nickname
        socket.emit('mood',{ "mood":"happy"});
    }

    self.stop = function(){
        socket.emit('stop',"Stop");
    }

    socket.on('track',function(data){
      var serverTime = data.latency;
      var totalLatency = data.latency + $scope.latency;
      
      setTimeout(function(){
        $scope.audio.src = "file:///android_asset/www/media/all.mp3";
        $scope.audio.play();
      }, 5000 - totalLatency);

    }); 

    socket.on('stop_track',function(data){
      // if(self.audio){
      //   self.audio.pause();
      // }
      $scope.audio.pause();
      $scope.audio.currentTime = 0;
      $scope.audio.src = "";
    });

    socket.on('disconect',function(data){
      $scope.latency = 0;
    })

  });  
  
});