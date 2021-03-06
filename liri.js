var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var omdb = require('omdb');
var keys = require('./keys');
var moment = require('moment');

var argument = process.argv[2];
var value = process.argv;

var inputVal = "";
for (var i = 3; i < value.length; i++) {
    if (i > 2 && i < value.length) {
        inputVal = inputVal + "+" + value[i];
    }
    else {
        inputVal += value[i]; 
    }
}

//switch statements
switch (argument) {
	case "movie-this":
		movieThis();
		break;

	case "spotify-this-song":
		mySpotify();
		break;

	case "my-tweets":
		myTwitter();
		break;

	case "do-what-it-says":
		doIt();
		break;
};

//************************************ functions ************************************

//movie this ---------------- 

function movieThis() {

    if (!inputVal){
        console.log("Your search was undefined... but here's info on JAWS!");
        inputVal = "Jaws";
      }

    console.log(inputVal);

	var queryUrl = "http://www.omdbapi.com/?t=" + inputVal + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body){
		if (error) {
			return console.log('Error occurred' + error)
		}
        body = JSON.parse(body)

        if (response.statusCode === 200){
            if (body.Response === 'False') {
                console.log('Error occurred:', body.Error)    
            } else {
                console.log("Title: " + body.Title);
                console.log("Release Year: " + body.Year);
                console.log("IMBD Rating: " + body.imbdRating);
                console.log("Country: " + body.Country);
                console.log("Language: " + body.Language);
                console.log("Plot: " + body.Plot);
                console.log("Actors: " + body.Actors);
            }
        }	
	});
}
 
//spotify ---------------- 

function mySpotify() {
	var spotify = new Spotify(keys.spotifyKeys);

      if (!inputVal){
        console.log("Your search was undefined... but here's info on Hey Ya");
        inputVal = "Hey Ya";
      }

	spotify.search({
		type: 'track',
		query: inputVal,
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
	        console.log("URL: " + songInfo.external_urls.spotify);
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
                console.log("");
                console.log(moment(tweets[i].created_at, 'ddd MMM DD HH:mm:ss Z YYYY').format('HH:mm MMM Do, YYYY'));
                console.log(tweets[i].user.screen_name);
                console.log(tweets[i].text);
                console.log("");
            }
        }
    });
}
//do what it says ---------------- 
function doIt() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArray = data.split(",");
        argument = dataArray[0];
        inputVal = dataArray[1];
        // console.log(dataArray);

        switch (argument) {
            case "movie-this":
            movieThis();
            break;

            case "spotify-this-song":
            mySpotify();
            break;

            case "my-tweets":
            myTwitter();
            break;
    };
  });
}




