var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require('keys.js');

var argument = process.argv[2];
var value = process.argv[3];


//switch statements
switch (argument) {
	case "this-movie":
		if (value === undefined){
			console.log("Your search was undefined... but here's info on Jaws")
			value = "Jaws";
			omdb();
		} else {
			omdb();
		}
		break;

	case "spotify-this-song":
		if (value === undefined){
			console.log("Your search was undefined... but here's info on Hey Ya")
			value = "Hey Ya";
			spotify();
		} else {
			spotify();
		}
		break;

	case "my-tweets":
		if (value === undefined){
			twitter();
		}
		break;

	case "do-what-it-says":
			readFile();
			break;
};

//************************************ functions ************************************

//movie this ---------------- 

function omdb() {
	var movieName = value; 
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body){
		if (error) {
			return console.log('Error occurred' + error)
		}

		if (!error && response.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMBD Rating: " + JSON.parse(body).imbdsRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
}
 
//spotify ---------------- 

function spotify() {
	var spotifyRequire = new Spotify({
	  id: '488585b7a11341c0927a7be781c8aa13',
	  secret: 'c241abc4990c4d47a39ac0f4448eff9d'
});
	console.log(spotifyRequire);

	spotifyRequire.search({
		type: 'track',
		query: value,
		limit: 1
	}, function(error, data) {
		// Throw Error
		if (error) {
			return console.log('Error occurred' + error)
		} else {
			var songInfo = data.tracks.items[0];
			var songResult = console.log("Artist: " + songInfo.artists[0].name);
	        console.log("Song: " + songInfo.name);
	        console.log("Album: " + songInfo.album.name);
	        console.log("URL: " + songInfo.preview_url);
	        // console.log(songResult);
		}
	});
}

//twitter ---------------- 
function twitter() {
    // Twitter User Based Auth.
    var client = new Twitter(
        keys
    );
    //console.log(client);
    // 20 tweets
    var params = {
        screen_name: 'timtimmeroo',
        limit: 20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        // Throw Error
        if (error) {
            throw error;
        }
        // No Error
        if (!error) {
            /*console.log(tweets);*/
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
    });
}

//do what it says ---------------- 



 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });