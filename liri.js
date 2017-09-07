var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var omdb = require('omdb');
var keys = require('./keys');

var argument = process.argv[2];
var value = process.argv;


//switch statements
switch (argument) {
	case "movie-this":
		if (value === undefined){
			console.log("Your search was undefined... but here's info on Jaws")
			value = "Jaws";
			movieThis();
		} else {
			movieThis();
		}
		break;

	case "spotify-this-song":
		// if (value === undefined){
		// 	console.log("Your search was undefined... but here's info on Hey Ya")
		// 	value = "Hey Ya";
		// // 	mySpotify();
		// } else {
			mySpotify();
		// }
		break;

	case "my-tweets":
		myTwitter();
		break;

	case "do-what-it-says":
		readFile();
		break;
};

//************************************ functions ************************************

//movie this ---------------- 

function movieThis() {
    var movieName = "";
    for (var i = 3; i < value.length; i++) {
      if (i > 3 && i < value.length) {
        movieName = movieName + "+" + value[i];
      }
      else {
        movieName += value[i];
      }
    }
    console.log(movieName);

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body){
		if (error) {
			return console.log('Error occurred' + error)
		}

		if (!error && response.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMBD Rating: " + JSON.parse(body).imbdRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
}
 
//spotify ---------------- 

function mySpotify() {
	var spotify = new Spotify(keys.spotifyKeys);

    var song = "";
    for (var i = 3; i < value.length; i++) {
      if (i > 3 && i < value.length) {
        song = song + "+" + value[i];
      }
      else {
        song += value[i];
      }
    }

	spotify.search({
		type: 'track',
		query: song,
		limit: 5
	}, function(error, data) {
		// Throw Error
		if (error) {
			return console.log('Error occurred' + error);
		} else {
			var songInfo = data.tracks.items[0];
			var songResult = console.log("Artist: " + songInfo.artists[0].name);
	        console.log("Song: " + songInfo.name);
	        console.log("Album: " + songInfo.album.name);
	        console.log("URL: " + songInfo.external_urls);
	        // console.log();
		}
	});
}

//twitter ---------------- 
function myTwitter() {
    // Twitter User Based Auth.
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    //console.log(client);
    // 20 tweets
    var params = {
        screen_name: 'timtimmeroo',
        count: 20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        // Throw Error
        if (error) {
            throw error;
        }
        // No Error
        if (!error) {
        
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].user.screen_name);
                console.log(tweets[i].text);
                console.log("");
            }
        }
    });
}

