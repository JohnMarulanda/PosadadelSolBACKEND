const { Router } = require('express');
const router = Router();
const { getUsers, getUsersById, createUsers, updateUsers, deleteUsers, login } = require('../controllers/index.controller');

//Metods HTTP
router.get('/users', getUsers);

router.get('/users/:id', getUsersById);

router.post('/users', createUsers);

router.post('/login', login);

router.put('/users/:id', updateUsers);

router.delete('/users/:id', deleteUsers);

module.exports = router;
