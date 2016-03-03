function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}


function createImageFromDataUrl(data_url) {
    var i = new Image();
    i.onload = function() {
        me.addImageToSlide({name: "name", src: this.src + name, width: this.width, height: this.height});
    };
    i.src = data_url;
}

function blobAsDataUrl(blob, func) {
    var reader = new FileReader();
    reader.onloadend = function() {
        func(reader.result);
    };

    reader.readAsDataURL(blob);
}

function createImageFromBlob(blob) {
    blobAsDataUrl(blob, createImageFromDataUrl);
}

function fileAsDataUrl(file, func) {
    var reader = new FileReader();
    reader.onloadend = function() {
        func(reader.result);
    };
    reader.readAsBinaryString(file);
}

function createImageFromFile(file) {
    fileAsDataUrl(file, createImageFromBlob);
}

//JSON File is defined in loadimage.js module
function createImageFromJSONFile(json) {
    var blob = b64toBlob(json.file, json.type);
    createImageFromBlob(blob);
}