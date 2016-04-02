var mongoose = require ('mongoose');

module.exports = function(){

    var FieldSchema = new mongoose.Schema({
        label: String,
        type: {type: String, enum:['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'], default: 'TEXT'},
        placeholder: String,
        options: [{label:String, value:String}]
    },{collection: "field"});
    return FieldSchema;
}