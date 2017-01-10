// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('ninetiesboy', ['ionic', 'ninetiesboy.controllers', /*'ninetiesboy.services', */'firebase'])
//.constant('FirebaseUrl', 'https://nineties-boy.firebaseio.com/')
//.service('rootRef', ['FirebaseUrl', Firebase])
.run(function($ionicPlatform, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

/*    $rootScope.firebaseUrl = firebaseUrl;
    $rootScope.displayName = null;*/

 /*   Auth.$onAuth(function(authData){
    	if(authData) {
    		console.log("Logged in as:", authData.uid);
    	} else {
    		console.log("Logged out");
            $ionicLoading.hide();
            $location.path('/login');
    	}
    });

    $rootScope.logout = function () {
        console.log("Logging out from the app");
        $ionicLoading.show({
            template: 'Logging Out...'
        });
        Auth.$unauth();
    }*/


  /*  $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    });*/
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
  	url: '/login',
  	templateUrl: 'templates/login.html',
  	controller: 'LoginCtrl',
  	resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth",
            function (Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
			}]
    }
  })
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth",
            function (Auth) {
                // $requireAuth returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return Auth.$requireAuth();
  			}]
    }
  })

  // Each tab has its own nav history stack:

  .state('tab.news', {
    url: '/news',
    views: {
      'tab-news': {
        templateUrl: 'templates/tab-news.html',
        controller: 'NewsCtrl'
      }
    }
  })

  .state('tab.news-detail', {
    url: '/news:newsid',
    views: {
      'tab-news': {
        templateUrl: 'templates/tab-news-detail.html',
        controller: 'NewsDetailCtrl'
      }
    }
  })

  .state('tab.video', {
    url: '/video',
    views: {
      'tab-video': {
        templateUrl: 'templates/tab-video.html',
        controller: 'VideoCtrl'
      }
    }
  })

  .state('tab.video-detail', {
    url: '/video:videoid',
    views: {
      'tab-video': {
        templateUrl: 'templates/tab-news-detail.html',
        controller: 'NewsDetailCtrl'
      }
    }
  })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
