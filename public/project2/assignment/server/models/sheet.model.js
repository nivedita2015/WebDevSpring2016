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
        findAllComponentsInSheet: findAllComponentsInSheet,
        findComponentInSheet: findComponentInSheet,
        deleteComponentFromSheet: deleteComponentFromSheet,
        createComponentInSheet: createComponentInSheet,
        updateComponentInSheet: updateComponentInSheet
    };

    return api;

    function createSheet (sheet) {
        sheet._id = (new Date).getTime();
        mockSheets.push(sheet);
        console.log(sheet);
        return sheet;
    };

    function findAllSheets () {
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

    function findSheetsForUser(userId) {
        console.log("entred find sheets for user in sheet model server");
        console.log("userId is " + userId);
        var sheetsForUser = [];
        var sheet;
        for (var index in mockSheets) {
            if (mockSheets[index].userId == userId) {

                sheetsForUser.push(mockSheets[index]);
            }
        }
        return sheetsForUser;

    };

    //functions for components of the sheet
    function findAllComponentsInSheet(sheetId){

        console.log("inside sheet model");
        var components = [];
        var sheet;
        for(var index in mockSheets){
            sheet = mockSheets[index];
            if(sheet._id=== sheetId){
                components = sheet.components;
                return components;
                break;
            }
        }
        return null;
    };

    function findComponentInSheet(componentId, sheetId){
        var component;
        var sheet = findSheetById(sheetId);
        for(var index in sheet.components){
            component = sheet.components[index];
            if(component._id === componentId){
                return component;
                break;
            }
        }
        return null;
    };

    function deleteComponentFromSheet(componentId, sheetId){
        var component;
        var sheet = findSheetById(sheetId);
        for (var index in sheet.components){
            component = sheet.components[index];
            if( component._id === componentId){
                sheet.components.splice(index, 1);
                return sheet.components;
            }
        }
    };


    function createComponentInSheet(sheetId, newComponent){

        console.log("inside createComponentForSheet  model");

        var sheet = findSheetById(sheetId);
        newComponent._id = "id_"+(new Date).getTime();
        sheet.components.push(newComponent);
        return newComponent;
    };

    function updateComponentInSheet(sheetId, componentId, updatedComponent){
        var sheet = findSheetById(sheetId);
        var component;
        for(var index in sheet.components){
            if(sheet.components[index]._id === componentId){
                sheet.components[index] = updatedComponent;
                break;
            }
        }
    };



}