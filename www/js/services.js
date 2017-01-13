angular.module('ninetiesboy.services', ['firebase'])
.factory('RatingsWithAverage', function ($firebaseArray){
    return $firebaseArray.$extend({
      average: function() {
        var total = 0;
        var count = 0;
        angular.forEach(this.$list, function(rat) {
          total += rat.rating;
          count++;
        });
        return total > 0 ? total / count : 0;
      }
    });
  })
  .service('News', News)
  .service('Videos', Videos)
  .service('Reseed', Reseed);

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

function Videos($firebaseArray, $rootScope, RatingsWithAverage){
  var ref = firebase.database().ref('/videos');
    var videos = $firebaseArray(ref);

    return {
      all: function(){
        return videos;
      },
      get: function(videoId){
        return videos.$getRecord(videoId);
      },
      addRating: function(videoId, rating){
        ref.child(videoId)
        .child('ratings')
        .child($rootScope.authData.uid)
        .set({ "rating": rating});
      },
      getAverageRating: function(videoId){
        var ratingsRef = ref.child(videoId).child('ratings');
        return new RatingsWithAverage(ratingsRef);
      }
    }
}

function Reseed($rootScope){

  var seeder = {};

  seeder.Seed = function(){
    var newsref = firebase.database().ref().child("/news");
    newsref.push({ 
      "title" : "FAM - THE ALBUM", 
      "body": "FAM - THE ALBUM: OUT NOW ON ITUNES",
      "imageName": "fam-album.webp"
    });

    newsref.push({ 
      "title" : "TAKE ME BACK", 
      "body": "NINETIES BOY FT. DEEKS & MAUKOE - TAKE ME BACK: OUT NOW ON ITUNES",
      "imageName": "takemeback-single.webp"
    });

    newsref.push({ 
      "title" : "GET EM", 
      "body": "NINETIES BOY - GET EM: OUT NOW ON ITUNES",
      "imageName": "getem-signle.webp"
    });

    newsref.push({ 
      "title" : "TWO DAY HANGOVER", 
      "body": "NINETIES BOY - TWO DAY HANGOVER: OUT ON NOW ON ITUNES",
      "imageName": "twodayhangover-single.webp"
    });

    newsref.push({ 
      "title" : "GOOD ENOUGH", 
      "body": "NINETIES BOY - GOOD ENOUGH: OUT NOW ON ITUNES",
      "imageName": "goodenoughforyou-single.webp"
    });

    newsref.push({ 
      "title" : "GET IT ON", 
      "body": "NINETIES BOY FT. TAYALA - GET IT ON: OUT NOW ON ITUNES",
      "imageName": "getiton-single.webp"
    });

    newsref.push({ 
      "title" : "BRIT HOP", 
      "body": "NINETIES BOY - BRIT HOP: OUT NOW ON ITUNES",
      "imageName": "brithop-single.webp"
    });
    

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

    videosref.push({
      "name" : "Nineties Boy Ft. Deeks - I'm Yorkshire (Official Video)",
      "url" : "https://www.youtube.com/embed/gYGBlBRH1gY"
    });

    videosref.push({
      "name" : "Deeks Ft. Nineties Boy - Droppin Bangers (Official Video)",
      "url" : "https://www.youtube.com/embed/TOe-uFSUkHI"
    });

    videosref.push({
      "name" : "Nineties Boy Ft. Deeks - The Sound (Official Live Session)",
      "url" : "https://www.youtube.com/embed/aNqlKvbrBAk"
    });

    videosref.push({
      "name" : "Nineties Boy Ft. Deeks & Maukoe - Take Me Back (Official Video)",
      "url" : "https://www.youtube.com/embed/JN92RoF3-9k"
    });

    videosref.push({
      "name" : "Nineties Boy - Get Em (Official Video)",
      "url" : "https://www.youtube.com/embed/Hbem5R9ZR-8"
    });

    videosref.push({
      "name" : "Nineties Boy - Two Day Hangover (Official Video)",
      "url" : "https://www.youtube.com/embed/kP3M4gsanzk"
    });

    videosref.push({
      "name" : "Nineties Boy - Good Enough For You (Official Video)",
      "url" : "https://www.youtube.com/embed/N2_-P0rWFYs"
    });

    videosref.push({
      "name" : "Nineties Boy - Brit Hop: Definition (Official Video)",
      "url" : "https://www.youtube.com/embed/pMQELFV5LHg"
    });

    videosref.push({
      "name" : "Nineties Boy - Get It On ft. Tayala (Official Video)",
      "url" : "https://www.youtube.com/embed/Wvln-XIq1s0"
    });

    videosref.push({
      "name" : "Nineties Boy - Take Control (Official Video)",
      "url" : "https://www.youtube.com/embed/05GwbK9JCFM"
    });

  };

  return seeder;
}
