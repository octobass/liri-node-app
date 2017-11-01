var keys = require("./keys.js");

var input = process.argv[2];

console.log(input);


// Twittter
var Twitter = require('twitter');

var client = new Twitter(keys.twitterKeys);

if (input === "my-tweets") {
    var params = { screen_name: 'octobass', count: 20, include_rts: true };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        // console.log(tweets);
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
        }
        if (!error) {
            console.log(error);
        }
    });
}

// Spotify
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotifyKeys);

var song = process.argv[3];

if (song === undefined) {
    process.argv[3] = "The Sign";
}

if (input === "spotify-this-song" && process.argv[3] !== undefined) {
    var song = "";
    for (var i = 3; i < process.argv.length; i++) {
        song = song + " " + process.argv[i];
    }

    spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);

        }
        // console.log(JSON.stringify(data, null, 2));
        var data = data.tracks.items;
        console.log("Artist: " + data[0].artists[0].name);
        console.log("Song name: " + data[0].name);
        console.log("Preview link: " + data[0].preview_url);
        console.log("Album name: " + data[0].album.name);
    });
}
// else {
//     console.log("enter a song!");


//OMDB
var request = require("request");

var movieName = process.argv[3];

if (movieName === undefined) {
    movieName = "Mr Nobody";
}

if (input === "movie-this") {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            // console.log(response);
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Source);
            console.log("Country produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

        }
    });
};

//do-what-it-says

if (input === "do-what-it-says") {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);


        spotify.search({ type: 'track', query: data, limit: 1 })
            .then(function(data) {
                // console.log(data);
                console.log(JSON.stringify(data, null, 2));
            })
            .catch(function(err) {
                console.log(error);
            });

    });
};


if (input === undefined) {
    console.log("Enter one of the following: my-tweets, spotify-this-song, movie-this, do-what-it-says");
}
