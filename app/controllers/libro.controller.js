// Importar la configuración de la base de datos y el modelo Customer
const db = require('../config/db.config.js');
const Libro = db.Libro;

// Crear un nuevo cliente(Crear tabla y guardar datos)
exports.create = (req, res) => {
    let libro = {};//aqui

    try{
        // Construir el objeto Customer a partir del cuerpo de la solicitud
        libro.libro = req.body.libro;//cambiar cada uno
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.paisautor = req.body.paisautor;
        libro.pagina = req.body.pagina;
        libro.year = req.body.year;
        libro.precio = req.body.precio;

        // Guardar en la base de datos
        Libro.create(libro).then(result => {    //cambiar nombres
            // Enviar mensaje de éxito al cliente
            res.status(200).json({
                message: "Upload Successfully a Libro with id = " + result.id,//aqui
                libro: result,//aqui
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Obtener todos los clientes
exports.retrieveAllLibros = (req, res) => {
    // Buscar toda la información de los clientes 
    Libro.findAll()
        .then(libroInfos => {
           // Enviar la lista de clientes al cliente
            res.status(200).json({
                message: "Get all Empleados' Infos Successfully!",
                libros: libroInfos
            });
        })
        . catch(error => {
          // log on console y enviar mensaje de error al cliente
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

//Buscar por nombre
exports.getlibrosByName = (req, res) => {
    const libroName = req.params.nombre_libro;
    Libro.findAll({ where: { nombre_libro: libroName } })
        .then(libros => {
            res.status(200).json({
                message: "Libros obtenidas exitosamente con el nombre = " + libroName,
                libros: libros
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener las canciones!",
                error: error.message
            });
        });
};


// Obtener un cliente por ID
exports.getLibroById = (req, res) => {
    // Obtener el ID del cliente de los parámetros de la solicitud 
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
           // Enviar los datos del cliente al cliente
            res.status(200).json({
                message: " Successfully Get a Libro with id = " + libroId,
                libros: libro
            });
        })
        . catch(error => {
          // log on console y enviar mensaje de error al cliente
          console.log(error);
  
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
  }

  // Actualizar un cliente por ID
exports.updateById = async (req, res) => {
    try{
      // Obtener el ID del cliente de los parámetros de la solicitud
        let libroId = req.params.id;//cambiar
        // Buscar el cliente en la base de datos
        let libro = await Libro.findByPk(libroId);
    
        if(!libro){
            // Enviar mensaje de error si el cliente no existe
            res.status(404).json({
                message: "Not Found for updating a Libro with id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {    
            // Construir el objeto actualizado con los datos de la solicitud
            let updatedObject = {
                libro: req.body.libro,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                paisautor: req.body.paisautor,
                pagina: req.body.numeropagina,
                year: req.body.year,
                precio: req.body.precio
            }
            // Actualizar el cliente en la base de datos
            let result = await Libro.update(updatedObject, {returning: true, where: {id: libroId}});
            
            // Envia mensaje de error por si no actualiza
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a empleado with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            // Enviar mensaje de éxito y el cliente actualizado al cliente
            res.status(200).json({
                message: "Update successfully a Libro with id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a customer with id = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un cliente por ID
exports.deleteById = async (req, res) => {
    try{
      // Obtener el ID del cliente de los parámetros de la solicitud
        let libroId = req.params.id;
        // Obtener el ID del cliente de los parámetros de la solicitud
        let libro = await Libro.findByPk(libroId);

        if(!libro){
          // Enviar mensaje de error si el cliente no existe
            res.status(404).json({
                message: "Does Not exist a Libro with id = " + libroId,
                error: "404",
            });
        } else {
          // Eliminar el cliente de la base de datos
            await libro.destroy();
            // Enviar mensaje de éxito y el cliente eliminado al cliente
            res.status(200).json({
                message: "Delete Successfully a Libro with id = " + libroId,
                libro: libro,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message,
        });
    }
}