module.exports = function(mongoose) {

    var schema = mongoose.Schema;

    var IfSchema = new schema({
        operation : String,
        inputCell1: String,
        inputCell2: String,
        thenCell  : String,
        elseCell  : String
    });

    var ArithmeticSchema = new schema({
        operation: String, inputCell1: String, inputCell2: String
    });

    var SheetSchema = new schema({
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

