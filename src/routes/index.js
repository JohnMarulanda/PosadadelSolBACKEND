const { Router } = require('express');
const router = Router();
const { getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    login,
    getUsersByemail,
    countUsers } = require('../controllers/user.controller');

const {
    getRooms,
    createRoom,
    getRoomByID,
    updateRoom,
    deleteRoom,
    getRoomByType,
    countRooms } = require('../controllers/hab.controller');

const {
    getServices,
    createService,
    getServiceByID,
    updateService,
    deleteService,
    getServiceByType
} = require('../controllers/serv.controller');


const {
    contactoUser,
    getMensajesPorTipo,
    getMensajes,
    countMensajes
} = require('../controllers/contac.controller');

const {
    getEmployees,
    createEmployee,
    getEmployeeByDNI,
    updateEmployee,
    deleteEmployee,
    countEmployees
} = require('../controllers/workers.controller')

const {
    getPlans,
    createPlan,
    getPlanByID,
    updatePlan,
    deletePlan
} = require('../controllers/plans.controller')

const {
    getManagers,
    createManager,
    getManagerByDNI,
    updateManager,
    deleteManager
} = require('../controllers/admin.controller')


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

router.get('/userscant', countUsers);




// Rutas para los controladores de habitaciones
router.get('/rooms', getRooms);
router.post('/rooms', createRoom);
router.get('/rooms/:habitacionId', getRoomByID);
router.put('/rooms/:habitacionId', updateRoom);
router.delete('/rooms/:habitacionId', deleteRoom);
router.get('/rooms/type/:tipo', getRoomByType);
router.get('/roomscant', countRooms);


// Rutas para los controladores de gerentes
router.get('/managers', getManagers);
router.post('/managers', createManager);
router.get('/managers/:dni', getManagerByDNI);
router.put('/managers/:dni', updateManager);
router.delete('/managers/:dni', deleteManager);

// Rutas para los controladores de empleados
router.get('/employees', getEmployees);
router.get('/employeescant', countEmployees);
router.post('/employees', createEmployee);
router.get('/employees/:dni', getEmployeeByDNI);
router.put('/employees/:dni', updateEmployee);
router.delete('/employees/:dni', deleteEmployee);


// Rutas para los controladores de servicios
router.get('/services', getServices);
router.post('/services', createService);
router.get('/services/:servicioId', getServiceByID);
router.get('/services/type/:tipo', getServiceByType);
router.put('/services/:servicioId', updateService);
router.delete('/services/:servicioId', deleteService);


// Rutas para los controladores de planes
router.get('/plans', getPlans);
router.post('/plans', createPlan);
router.get('/plans/:planId', getPlanByID);
router.put('/plans/:planId', updatePlan);
router.delete('/plans/:planId', deletePlan);


//Rutas para el mensaje de contactanos:
router.post('/contacto', contactoUser);
router.get('/mensajes/:tipo', getMensajesPorTipo);
router.get('/mensajes', getMensajes);
router.get('/mensajescant', countMensajes);




module.exports = router;
