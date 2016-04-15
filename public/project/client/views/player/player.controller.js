(function() {

    angular
        .module("PrismaticMusicApp")
        .controller("PlayerController", PlayerController);

    function PlayerController($routeParams) {
        var vm = this;


        var artist = $routeParams.artistName;
        var title = $routeParams.trackName;

        //vm.title = null;
        //vm.tags = null;

        function init() {
            //vm.artist = artist;

            SC.initialize({
                client_id: '98f35e5571e2edb9a137bf54910e57a1'
            });
            playSong(artist, title);
            console.log("init");
            console.log(vm);
        }

        init();

        function playSong(artist, title) {
            SC.get('/tracks', {
                q: title+' '+artist
            }, function (tracks) {

                console.log(tracks);
                var played= false;

                for(var i =0; i<tracks.length;i++) {

                    console.log("in for ->if " + i);
                    var PLbool = (tracks[i].permalink.indexOf(title) >= 0 && tracks[i].permalink.indexOf(artist) >= 0);
                    var TLbool = (tracks[i].tag_list.indexOf(title) >= 0 && tracks[i].tag_list.indexOf(artist) >= 0 );
                    var TitleBool = (tracks[i].title.indexOf(title) >= 0 && tracks[i].title.indexOf(artist) >= 0);
                    console.log("PLbool " + PLbool);
                    console.log("TLbool " + TLbool);
                    console.log("TitleBool " + TitleBool);

                    if (((tracks[i].permalink.indexOf(title) >= 0 && tracks[i].permalink.indexOf(artist) >= 0) ||
                        (tracks[i].title.indexOf(title) >= 0 && tracks[i].title.indexOf(artist) >= 0) ||
                        (tracks[i].tag_list.indexOf(title) >= 0 && tracks[i].tag_list.indexOf(artist) >= 0 )) &&
                        (tracks[i].track_type !== 'recording' && tracks[i].track_type !== 'spoken' &&
                        tracks[i].track_type !== 'demo' && tracks[i].track_type !== 'in progress' &&
                        tracks[i].track_type !== null && tracks[i].genre !== "" && tracks[i].genre !== null)) {

                            played = true;
                            vm.title = tracks[i].title;
                            vm.tags = tracks[i].tag_list;

                            SC.oEmbed(tracks[i].permalink_url, {
                                auto_play: true,
                                maxHeight: 200
                            }, document.getElementById('player'));
                            break;
                    }
                }

                if(played === false) {
                    console.log("in played === false");
                    played = true;
                    vm.title = tracks[0].title;
                    vm.tags = tracks[0].tag_list;
                    SC.oEmbed(tracks[0].permalink_url, {
                        auto_play: true,
                        maxHeight: 200
                    }, document.getElementById('player'));
                }
            });
            console.log(vm);
        }

        /*function playSong(artist, title) {
            SC.get('/users', {
                q: artist
            }, function (users) {
                console.log(users);
                var maxCountIndex =0;
                for (var i = 0; i < users.length; i++) {
                    if(users[i].track_count > users[maxCountIndex].track_count) {
                        maxCountIndex = i;
                    }
                }
                console.log("maxCountIndex");
                console.log(maxCountIndex);
                console.log(users[maxCountIndex].username);
                SC.get('/users/' + users[maxCountIndex].username + '/tracks', {
                    limit: 100//, bpm: {from: 20}
                }, function (tracks) {
                    var trackList = "";
                    console.log(tracks);
                    for (var i = 0; i < tracks.length; i++) {
                        /!* populate trackList html *!/
                        console.log("in for");
                        console.log(tracks[i]);
                        if (tracks[i].user.username === artist || tracks[i].track_type === "original") {
                            //trackList += tracks[i];
                            console.log("Tracks");
                            console.log(tracks[i]);
                            SC.oEmbed(tracks[i].permalink_url, {
                                auto_play: true,
                                maxHeight: 200
                            }, document.getElementById('player'));
                        }
                    }
                    //console.log("Tracks");
                    //console.log(trackList);
                });
            });
        }*/
    }
})();