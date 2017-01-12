angular.module('ninetiesboy.services', ['firebase'])
  .service('News', News)
  .service('Videos', Videos)
  .service('Reseed', Reseed)
  .service('Ratings', Ratings);

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

function Videos($firebaseArray, $rootScope){
  var ref = firebase.database().ref('/videos');
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

function Ratings($firebaseArray, $firebase, $rootScope){
    
    return {
     /* byUser: function(){
        var ref = firebase.database().ref('/ratings').orderByChild('uid').equalTo($rootScope.authData.uid);
        var ratings = $firebaseArray(ref);

        return ratings;
      },*/
      byVideo: function(videoId){
        var ref = firebase.database().ref().child("/ratings").orderByChild('videoId').equalTo(videoId);
        var ratings = $firebaseArray(ref);
        return ratings;
      },
      byUserVideo: function(videoId){
        var ref = firebase.database().ref().child("ratings").orderByChild('useridvideoid').equalTo($rootScope.authData.uid + "~" + videoId);
        var ratings = $firebaseArray(ref);
        return ratings;
      },
      totalByVideo: function(videoId){
        var ref = firebase.database().ref().child("/ratings").orderByChild('videoId').equalTo(videoId);
 
        var AverageFactory = $FirebaseArray.$extendFactory({
          getAverage: function() {
            var total = 0;
            // the array data is located in this.$list
            angular.forEach(this.$list, function(rec) {
              total += rec.amount;
            });
            return total / this.$list.length;
          }
        });

        return $firebase(ref, {arrayFactory: AverageFactory}).$asArray();
      }
    }
}

function Reseed($rootScope){

  var seeder = {};

  seeder.Seed = function(){
    var newsref = firebase.database().ref().child("/news");
    newsref.push({ "title" : "news item one", "body": "asdasdasdasdasdasdasdasdadasd asda sasda sd"});
    newsref.push({ "title" : "news item two", "body": "asdasdasdasdasdasdasdasdadasd asda sasda sd"});
    newsref.push({ "title" : "news item three", "body": "asdasdasdasdasdasdasdasdadasd asda sasda sd"});
    newsref.push({ "title" : "news item four", "body": "asdasdasdasdasdasdasdasdadasd asda sasda sd"});
    newsref.push({ "title" : "news item five", "body": "asdasdasdasdasdasdasdasdadasd asda sasda sd"});

    

    var videosref = firebase.database().ref().child("/videos");
    videosref.push({"name" : "Nineties Boy Ft. Deeks - Magaluf (Official Video)",
      "url" : "https://www.youtube.com/embed/uuc1yV912Jo"})
    .then((snap) => {
      videosref.child(snap.key).child('ratings').child($rootScope.authData.uid)
      .set({
        "rating": 2,
      });
    });
    videosref.push({
      "name" : "Nineties Boy - Push (Official Video)",
      "url" : "https://www.youtube.com/embed/msubZ1TA8-c"
    })
    .then((snap) => {
      videosref.child(snap.key).child('ratings').child($rootScope.authData.uid)
      .set({
        "rating": 5,
      });
    });
    videosref.push({
      "name" : "Nineties Boy Ft. Deeks - Grime Up North (Official Video)",
      "url" : "https://www.youtube.com/embed/Y2rdwiT6mz4"
    }).then((snap) => {
      videosref.child(snap.key).child('ratings').child($rootScope.authData.uid)
      .set({
        "rating": 9,
      });
    });

    function addRating(rating){
      var ref = firebase.database().ref();
      var id = ref.child('/ratings').push();
      id.set(rating, function(err) {
        if (!err) {
          var name = id.key;
          ref.child("/videos/" + rating.videoid + "/ratings/" + name).set(true);
        }
      });
    }

  };

  return seeder;
}
