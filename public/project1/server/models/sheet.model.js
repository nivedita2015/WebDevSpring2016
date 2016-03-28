var mockSheets = require("./sheet.mock.json");

module.exports = function(app){
    var api = {
        createSheet: createSheet,
        findAllSheets: findAllSheets,
        findSheetById: findSheetById,
        updateSheet: updateSheet,
        deleteSheet: deleteSheet,
        findSheetByTitle: findSheetByTitle,
        findSheetsForUser: findSheetsForUser,
        findAllSheetDetailsInSheet: findAllSheetDetailsInSheet,
        findSheetDetailInSheet: findSheetDetailInSheet,
        deleteSheetDetailFromSheet: deleteSheetDetailFromSheet,
        createSheetDetailInSheet: createSheetDetailInSheet,
        updateSheetDetailInSheet: updateSheetDetailInSheet
    };

    return api;

    function createSheet (sheet) {
        sheet._id = (new Date).getTime();
        mockSheets.push(sheet);
        console.log(sheet);
        return sheet;
    };

    function findAllSheets () {
        console.log("inside model.js");
        return mockSheets;
    };

    function findSheetById (sheetId) {
        for (var index in mockSheets) {
            if (mockSheets[index]._id === sheetId) {
                return mockSheets[index];
                break;
            }
        }
        return null;
    };

    function updateSheet (sheetId, sheet) {
        for (var index in mockSheets) {
            if (mockSheets[index]._id === sheetId) {
                mockSheets[index] = sheet;
                return true;
            }
        }
    };

    function deleteSheet (sheetId) {
        console.log("entered deleteSheet in model");
        console.log("sheetId is " + sheetId);
        for (var index in mockSheets) {
            if (mockSheets[index]._id == sheetId) {
                console.log("entered if condition");
                mockSheets.splice(index, 1);
                return true;
            }
        }
        return false;
    };

    function findSheetByTitle(title) {
        var sheet;
        for (var index in mockSheets) {
            sheet = mockSheets[index];
            if (sheet.title == title) {
                return sheet;
                break;
            }
        }
        return null;
    };

    //functions for sheetDetails of the sheet
    function findAllSheetDetailsInSheet(sheetId){

        console.log("inside sheet model");
        var sheetDetails = [];
        var sheet;
        for(var index in mockSheets){
            sheet = mockSheets[index];
            if(sheet._id=== sheetId){
                sheetDetails = sheet.sheetDetails;
                return sheetDetails;
                break;
            }
        }
        return null;
    };

    function findSheetDetailInSheet(sheetDetailId, sheetId){
        var sheetDetail;
        var sheet = findSheetById(sheetId);
        for(var index in sheet.sheetDetails){
            sheetDetail = sheet.sheetDetails[index];
            if(sheetDetail._id === sheetDetailId){
                return sheetDetail;
                break;
            }
        }
        return null;
    };

    function deleteSheetDetailFromSheet(sheetDetailId, sheetId){
        var sheetDetail;
        var sheet = findSheetById(sheetId);
        for (var index in sheet.sheetDetails){
            sheetDetail = sheet.sheetDetails[index];
            if( sheetDetail._id === sheetDetailId){
                sheet.sheetDetails.splice(index, 1);
                return sheet.sheetDetails;
            }
        }
    };


    function createSheetDetailInSheet(sheetId, newSheetDetail){

        console.log("inside createSheetDetailForSheet  model");

        var sheet = findSheetById(sheetId);
        newSheetDetail._id = "id_"+(new Date).getTime();
        sheet.sheetDetails.push(newSheetDetail);
        return newSheetDetail;
    };

    function updateSheetDetailInSheet(sheetId, sheetDetailId, updatedSheetDetail){
        var sheet = findSheetById(sheetId);
        var sheetDetail;
        for(var index in sheet.sheetDetails){
            if(sheet.sheetDetails[index]._id === sheetDetailId){
                sheet.sheetDetails[index] = updatedSheetDetail;
                break;
            }
        }
    };



}