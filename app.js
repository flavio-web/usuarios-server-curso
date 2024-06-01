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


app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
});