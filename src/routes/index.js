const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { authuser, authpassword, llave } = require('../configs/config');

const { getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard,
    getUserCardsById } = require('../controllers/index.controller');

    router.get('/', function(req, res) {
        res.send('Inicio');
    });
    
    router.post('/autenticar', (req, res) => {
        if(req.body.usuario === authuser && req.body.contrasena === authpassword) {
      const payload = {
       check:  true
      };
      const token = jwt.sign(payload, llave, {
       expiresIn: 1440
      });
      res.json({
       mensaje: 'Autenticación correcta',
       token: token
      });
        } else {
            res.json({ mensaje: "Usuario o contraseña incorrectos"})
        }
    });

    router.use((req, res, next) => {
        const token = req.headers['access-token'];
     
        if (token) {
          jwt.verify(token, llave, (err, decoded) => {      
            if (err) {
              return res.json({ mensaje: 'Token inválida' });    
            } else {
              req.decoded = decoded;    
              next();
            }
          });
        } else {
          res.send({ 
              mensaje: 'Token no proveída.' 
          });
        }
     });

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/ccards', getCards);
router.get('/ccards/:id', getCardById);
router.post('/ccards', createCard);
router.put('/ccards/:id', updateCard);
router.delete('/ccards/:id', deleteCard);
router.get('/usercards/:id', getUserCardsById);


module.exports = router;