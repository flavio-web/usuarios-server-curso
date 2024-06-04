const express = require('express');
require('dotenv').config();

const User = require('./Models/user');


const app = express();
const port = process.env.PORT || 8080;

app.use( express.json() );


app.get('/usuarios', ( req, res ) =>{
    
    const user = new User();
    const listUsuarios = user.users;

    if( !listUsuarios || listUsuarios.length === 0 ){
        res.status(400).json({
            status: false,
            message: 'No existen usuarios'
        });
        return;
    }

    res.status(200).json({
        data: listUsuarios,
        status: true
    });

});

app.post('/usuario', ( req, res )=>{

    const data = req.body;

    const user = new User();

    user.saveUser( data );

    res.json({
        status: true,
        data
    });

});

app.get('/usuario/:id', ( req, res ) =>{

    const id = req.params.id;

    const user = new User();

    const data = user.searchUsuario( id );

    if( !data ){
        res.json({
            status: false,
            message: `No existe usuario con ID ${id}`
        });
        return;
    }
   
    res.json({
        status: true,
        data
    });

});

app.put('/usuario/:id', ( req, res ) =>{

    const id    = req.params.id;
    const body  = req.body;

    const user = new User();
    const data = user.updateUser( id, body );

    res.json( data );

});

app.delete('/usuario/:id', ( req, res ) =>{

    const id = req.params.id;

    const user = new User();

    const data = user.deleteUser( id );

    res.json( data );

});


app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
});