const { Router } = require('express');
const router = Router();
const { getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    login } = require('../controllers/user.controller');

const {
    getRooms,
    createRoom,
    getRoomByID,
    updateRoom,
    deleteRoom,
    getRoomByType } = require('../controllers/hab.controller');

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
    getMensajes
} = require('../controllers/contac.controller');

const {
    getEmployees,
    createEmployee,
    getEmployeeByDNI,
    updateEmployee,
    deleteEmployee
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

// Ruta para crear un nuevo usuario http://localhost:4000/users/
router.post('/users', createUsers);

// Ruta para realizar un inicio de sesión http://localhost:4000/login
router.post('/login', login);

// Ruta para actualizar un usuario por ID http://localhost:4000/users/:id
router.put('/users/:id', updateUsers);

// Ruta para eliminar un usuario por ID http://localhost:4000/users/:id
router.delete('/users/:id', deleteUsers);




// Rutas para los controladores de habitaciones
app.get('/rooms', getRooms);
app.post('/rooms', createRoom);
app.get('/rooms/:habitacionId', getRoomByID);
app.put('/rooms/:habitacionId', updateRoom);
app.delete('/rooms/:habitacionId', deleteRoom);
app.get('/rooms/type/:tipo', getRoomByType);


// Rutas para los controladores de gerentes
app.get('/managers', getManagers);
app.post('/managers', createManager);
app.get('/managers/:dni', getManagerByDNI);
app.put('/managers/:dni', updateManager);
app.delete('/managers/:dni', deleteManager);

// Rutas para los controladores de empleados
app.get('/employees', getEmployees);
app.post('/employees', createEmployee);
app.get('/employees/:dni', getEmployeeByDNI);
app.put('/employees/:dni', updateEmployee);
app.delete('/employees/:dni', deleteEmployee);

// Rutas para los controladores de servicios
app.get('/services', getServices);
app.post('/services', createService);
app.get('/services/:servicioId', getServiceByID);
app.get('/services/type/:tipo', getServiceByType);
app.put('/services/:servicioId', updateService);
app.delete('/services/:servicioId', deleteService);


// Rutas para los controladores de planes
app.get('/plans', getPlans);
app.post('/plans', createPlan);
app.get('/plans/:planId', getPlanByID);
app.put('/plans/:planId', updatePlan);
app.delete('/plans/:planId', deletePlan);


//Rutas para el mensaje de contactanos:
router.post('/contacto', contactoUser);
router.get('/mensajes/:tipo', getMensajesPorTipo);
router.get('/mensajes', getMensajes);




module.exports = router;
