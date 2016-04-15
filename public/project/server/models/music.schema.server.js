module.exports = function(mongoose) {

    var ProjectMusicSchema = new mongoose.Schema({
        mbId : String,
        favoritedUsers : [{userId : Number, username: String}],
        ratings : [Number]
    }, {collection : 'project.music'});

    return ProjectMusicSchema;
};