app.controller('ListsCtrl', function($scope, $ionicPlatform, $cordovaOauth, Spotify) {
  var clientId = 'ea7625f660bd43b3ad7efcbeb6305e95';
  $scope.playlists = [];
 
    $scope.performLogin = function() {
      $cordovaOauth.spotify(clientId, ['user-read-private', 'playlist-read-private']).then(function(result) {
        window.localStorage.setItem('spotify-token', result.access_token);
        Spotify.setAuthToken(result.access_token);
        $scope.updateInfo();
      }, function(error) {
          console.log("Error -> " + error);
      });
    };
 
    $scope.updateInfo = function() {
      Spotify.getCurrentUser().then(function (data) {
        $scope.getUserPlaylists(data.id);
      }, function(error) {
        $scope.performLogin();
      });
    };
 
    $ionicPlatform.ready(function() {
      var storedToken = window.localStorage.getItem('spotify-token');
      if (storedToken !== null) {
        Spotify.setAuthToken(storedToken);
        $scope.updateInfo();
      } else {
        $scope.performLogin();
      }
    });
 
    $scope.getUserPlaylists = function(userid) {
      Spotify.getUserPlaylists(userid).then(function (data) {
        $scope.playlists = data.items;
      });
    };
})