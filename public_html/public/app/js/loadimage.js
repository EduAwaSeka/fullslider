// Importamos el modulo para subir ficheros
var fs = require('fs');

exports.Uploads = function(req, res) {
    var tmp_path = req.files.inputimage.path;
    // Ruta donde colocaremos las imagenes
    var target_path = './public/uploaded-files/' + req.files.inputimage.name;
   // Comprobamos que el fichero es de tipo imagen
    if (req.files.inputimage.type.indexOf('image')==-1){
                res.send('El fichero que deseas subir no es una imagen');
    } else {
         // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
        fs.rename(tmp_path, target_path, function(err) {
            if (err){
				res.send(JSON.stringify({error: 'Error on upload file'}));
				throw err;
			};
            // Eliminamos el fichero temporal
            fs.unlink(tmp_path, function() {
				if (err){
					throw err;
				};
				res.send(JSON.stringify({}));
            });
         });
     }
};