const { Pool } = require('pg');
const { databasepassword } = require('../configs/config');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: databasepassword,
    database: 'HTDB',
    port: '5432'
});

var isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
  }

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    var exists = await pool.query('select exists(select 1 from users where id=$1)', [id]);
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if(exists.rows[0].exists){
        res.json(response.rows);
    } else {res.json('No user found.');}
    
};

const createUser = async (req, res) => {
    const {nombre, cedula, edad} = req.body;
    const response = await pool.query('INSERT INTO users (nombre, cedula, edad) VALUES ($1, $2, $3)', [nombre, cedula, edad]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {nombre, cedula, edad}
        }
    })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {nombre, cedula, edad} = req.body;

    const response =await pool.query('UPDATE users SET nombre = $1, cedula = $2, edad = $3 WHERE id = $4', [
        nombre, 
        cedula, 
        edad,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

const getCards = async (req, res) => {
    const response = await pool.query('SELECT * FROM creditcards ORDER BY ccard_id ASC');
    res.status(200).json(response.rows);
};

const getCardById = async (req, res) => {
    const id = parseInt(req.params.id);
    var exists = await pool.query('select exists(select 1 from creditcards where ccard_id=$1)', [id]);
    const response = await pool.query('SELECT * FROM creditcards WHERE ccard_id = $1', [id]);
    if(exists.rows[0].exists){
        res.json(response.rows);
    } else {res.json('No card found.');}
};

const createCard = async (req, res) => {
    const {user_id, saldo} = req.body;
    const response = await pool.query('INSERT INTO creditcards (user_id, saldo) VALUES ($1, $2)', [user_id, saldo]);
    res.json({
        message: 'User Creditcard successfully Added.',
        body: {
            user: {user_id, saldo}
        }
    })
};

const updateCard = async (req, res) => {
    const id = parseInt(req.params.id);
    const {user_id, saldo} = req.body;

    const response =await pool.query('UPDATE creditcards SET user_id = $1, saldo = $2 WHERE ccard_id = $3', [
        user_id, 
        saldo,
        id
    ]);
    res.json('Card Updated Successfully');
};

const deleteCard = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM creditcards where ccard_id = $1', [
        id
    ]);
    res.json(`Card ${id} deleted Successfully`);
};

const getUserCardsById = async (req, res) => {
    const id = parseInt(req.params.id);
    var exists = await pool.query('select exists(select 1 from creditcards where user_id=$1)', [id]);
    const response = await pool.query('SELECT * FROM creditcards WHERE user_id = $1', [id]);
    if(exists.rows[0].exists){
        res.json(response.rows);
    } else {res.json('No card found.');}
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard,
    getUserCardsById
};