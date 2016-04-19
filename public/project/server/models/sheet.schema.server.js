module.exports = function(mongoose) {
    var IfSchema = mongoose.Schema({
        operation : String,
        inputCell1: String,
        inputCell2: String,
        thenCell  : String,
        elseCell  : String
    });

    var ArithmeticSchema = mongoose.Schema({
        operation: String, inputCell1: String, inputCell2: String
    });

    var SheetSchema = mongoose.Schema({
        name: String,
        cells: [
            {
                label     : String,
                literal   : String,
                reference : String,
                ifObj     : IfSchema,
                arithmetic: ArithmeticSchema,
                editable  : Boolean,
                cellStyle : String,
                visible   : Boolean
            }
        ]
    }, {collection: "spreadsheetEditor.sheet"});
    return SheetSchema;
};

