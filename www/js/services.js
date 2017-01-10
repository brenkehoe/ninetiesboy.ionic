angular.module('ninetiesboy.services', ['firebase'])
  .service('News', News)
  .service('Videos', Videos);

/*function Auth(rootRef, $firebaseAuth) {
  var ref = new Firebase('https://nineties-boy.firebaseio.com/');
  return $firebaseAuth(ref);
}

Auth.$inject = ['rootRef', '$firebaseAuth'];*/

function News($firebaseArray){
    var ref = firebase.database().ref().child("/news");
    var news = $firebaseArray(ref);

    return {
      all: function(){
        return news;
      },
      get: function(newsId){
        return news.$getRecord(newsId);
      }
    }
}

function Videos($firebaseArray){
  var ref = firebase.database().ref().child("/videos");
    var videos = $firebaseArray(ref);

    return {
      all: function(){
        return videos;
      },
      get: function(videoId){
        return videos.$getRecord(videoId);
      }
    }
}
