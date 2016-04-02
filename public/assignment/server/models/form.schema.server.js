var mongoose = require('mongoose');
var Field = require('./field.schema.server.js')(mongoose);
module.exports = function(){
    var FormSchema = new mongoose.Schema({
        userId: String,
        title: String,
        fields: [Field],
        created: Date,
        updated: Date
    }, {collection: "form"});
    return FormSchema;
}