var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: '488585b7a11341c0927a7be781c8aa13',
  secret: 'c241abc4990c4d47a39ac0f4448eff9d'
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});