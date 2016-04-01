module.exports = function(mongoose){

    var Field = require('./field.schema.server.js')(mongoose);
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [Field],
        created: Date,
        updated: Date
    }, {collection: "form"});
    return FormSchema;
}