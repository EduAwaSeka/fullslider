/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


key('delete', function(e) {
    var selectedElement = Impressionist.prototype.getSelectedElement();
    if (selectedElement !== "") {
        Impressionist.prototype.deleteElement(selectedElement);
    }
});

key('ctrl+s', function(e) {
    e.preventDefault();
    e.stopPropagation();
    me.savePresentationOnSession();
});

key('ctrl+o', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $("#inputFile").click();
});