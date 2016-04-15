/*function playSong(artist, title) {
    var artistid = 0;
    SC.get('/users', {
        q:artist, streamable: true, limit: 1
    }, function(users) {
        console.log("users");
        console.log(users);
        artistid=users[0].id;
        console.log(artistid);


        console.log(artistid);
        var userSearch = '/users/'+artistid+'/tracks';
        console.log('/users/'+artistid+'/tracks');
        SC.get('/users/'+artistid+'/tracks', function (tracks) {
            console.log("Tracks1");
            console.log(tracks);
            for(var i =0; i<tracks.length;i++) {
                if(tracks[i].permalink.indexOf(title) >= 0) {
                    SC.oEmbed(tracks[i].uri, {auto_play: true, maxHeight: 200}, document.getElementById('player'));
                    break;
                }
            }
        });
    });
}*/

function playSong(artist, title) {
    /*SC.get('/tracks/'+artist+'-'+title, function(user){*/
    SC.get('/users/55213175/tracks', /*{
       // limit: 100//, bpm: {from: 20}
        q:title
    },*/ function (tracks) {
        var trackList = "";
        console.log(tracks);
    });
        //SC.oEmbed(user.uri, {auto_play: true, maxHeight: 200}, document.getElementById('player'));}).catch();
}
window.onload = function() {
    console.log("onload");
    SC.initialize({
        client_id: '98f35e5571e2edb9a137bf54910e57a1'
    });
};
/*SC.get('/users', {
 q:'david guetta', streamable: true, limit: 1
 }).then(function(users) {
 console.log("users");
 console.log(users);
 });*/

/*SC.stream('/tracks/157699684').then(function(sound) {
    $("audio-test").attr("src", sound.uri);
}
});*/
