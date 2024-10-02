let express = require('express');
let router = express.Router();
 
//TABLA LIBRO
const libros = require('../controllers/libro.controller.js');

//Tabla 
router.post('/api/libros/create', libros.create);
router.get('/api/libros/onebyid/:id', libros.getLibroById);
router.get('/api/libros/byname/:nombre_libro', libros.getlibrosByName);//cambiar
router.put('/api/libros/update/:id', libros.updateById);
router.delete('/api/libros/delete/:id', libros.deleteById);

module.exports = router;