const { Router } = require('express');
const router = Router();
const { getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    login, 
    getUsersByemail} = require('../controllers/user.controller');

const {
    getHab,
    getHabByType,
    getAvailableHabByType,
    getHabDescription,
    getHabPrice,
    updateHabByTipoHab,
    createHab,
    deleteHabByTipoHab } = require('../controllers/hab.controller');

const {
    getServ,
    getServByType,
    getServDescription,
    getServPrice,
    updateSerByTipoServ,
    createServ,
    deleteServByTipo
} = require('../controllers/serv.controller');


const {
    contactoUser,
    getMensajesPorTipo,
    getMensajes
} = require('../controllers/contac.controller');

//Metods HTTP

//Rutas para los usuarios:  user.controller
// Ruta para obtener todos los usuarios http://localhost:4000/users
router.get('/users', getUsers);

// Ruta para obtener un usuario por ID http://localhost:4000/users/:id
router.get('/users/:id', getUsersById);

// Ruta para obtener un usuario por ID http://localhost:4000/users/email/:email
router.get('/users/email/:email', getUsersByemail);

// Ruta para crear un nuevo usuario http://localhost:4000/users/
router.post('/users', createUsers);

// Ruta para realizar un inicio de sesión http://localhost:4000/login
router.post('/login', login);

// Ruta para actualizar un usuario por ID http://localhost:4000/users/:id
router.put('/users/:id', updateUsers);

// Ruta para eliminar un usuario por ID http://localhost:4000/users/:id
router.delete('/users/:id', deleteUsers);




//Rutas para las habitaciones:  hab.controller

// Ruta para obtener todas las habitaciones
router.get('/habitaciones', getHab);

// Ruta para obtener habitaciones por tipoHab
router.get('/habitaciones/:tipoHab', getHabByType);

// Ruta para obtener habitaciones disponibles por tipoHab
router.get('/habitaciones/disponibles/:tipoHab', getAvailableHabByType);

// Ruta para obtener la descripción de una habitación por tipo de habitación
router.get('/habitaciones/descripcion/tipo/:tipo_hab', getHabDescription);

// Ruta para obtener el precio de una habitación por tipo de habitación
router.get('/habitaciones/precio/tipo/:tipo_hab', getHabPrice);

// Ruta para eliminar la habitación por tipo de habitación
router.delete('/habitaciones/:tipo_hab', deleteHabByTipoHab);


// Ruta para actualizar la habitación por tipo de habitación
router.put('/habitaciones/:tipo_hab', updateHabByTipoHab);

// Ruta para crear una nueva habitación
router.post('/habitaciones', createHab);





//Rutas para los servicios:  serv.controller
// Ruta para obtener todos los servicios
router.get('/servicios', getServ);

// Ruta para obtener servicios por tipoServ
router.get('/servicios/:tipoServ', getServByType);

// Ruta para obtener la descripción de un servicio por tipo de servicio
router.get('/servicios/descripcion/tipo/:tipo_serv', getServDescription);

// Ruta para obtener el precio de un servicio por tipo de servicio
router.get('/servicios/precio/tipo/:tipo_serv', getServPrice);

// Ruta para actualizar un servicio por tipo
router.put('/servicios/:tipo_serv', updateSerByTipoServ);

// Ruta para crear un nuevo servicio
router.post('/servicios', createServ);

// Ruta para eliminar un servicio por tipo
router.delete('/servicios/:tipo_serv', deleteServByTipo);


//Rutas para el mensaje de contactanos:  user.controller
// Ruta para poster el mensaje http://localhost:4000/contacto
router.post('/contacto', contactoUser);

// Ruta para obtener el mensaje por tipo http://localhost:4000/mensajes/:tipo
router.get('/mensajes/:tipo', getMensajesPorTipo);

router.get('/mensajes', getMensajes);




module.exports = router;
