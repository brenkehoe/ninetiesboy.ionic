angular.module('ninetiesboy.controllers', [])

/*.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})*/

.controller('LoginCtrl', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope) {
  console.log('Login Controller Initialized');

  $scope.login = function() {
     var auth = $firebaseAuth();

    // login with Facebook
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  };
})
.controller('NewsCtrl', function($scope, News){
  $scope.$on('$ionicView.enter', function(e) {
    $scope.news = News.all();
  });
  
})
.controller('NewsDetailCtrl', function($scope, $stateParams, News){
  $scope.$on('$ionicView.enter', function(e) {
    $scope.newsItem = News.get($stateParams.newsId);
  });
})
.controller('VideoCtrl', function($scope, $sce, Videos){
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
  $scope.$on('$ionicView.enter', function(e) {
    $scope.videos = Videos.all();

    $scope.overallrating = {
      rate: 3,
      max: 10
    };

    $scope.readOnly = true;

    $scope.yourrating = {
      rate: 7,
      max: 10
    };

  });
  
})
.controller('VideoDetailCtrl', function($scope, VideoDetail){
  
})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
