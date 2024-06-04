
const path = require('path');
const fs = require('fs');

class User{

    constructor(){
        this.usuarios = [];
        this.dbPath = path.join( __dirname, '../database/db.json');
    }

    get users(){
        return require("../database/db.json");
    }

    saveUser( user ){
        const listadoUsers = this.addUsuario( this.users, user );
        fs.writeFileSync( this.dbPath, JSON.stringify( listadoUsers ) );
    }

    addUsuario( users = [], user ){
        const usuarios = users || [];
        usuarios.push( user );
        return usuarios;
    }

    searchUsuario( id ){
        return this.users.find( usuario => Number(usuario.id) === Number(id) );
    }

    updateUser( id, usuario ){

        const response = {
            status: true,
            message: '',
            data: null
        };

        try {
            
            const indexUser = this.users.findIndex( usuario => Number(usuario.id) === Number(id) );

            if( indexUser < 0 ) {
                throw new Error(`Usuario con ID ${id} no existe.`);
            }

            this.users[indexUser ] = usuario;

            fs.writeFileSync( this.dbPath, JSON.stringify( this.users ) );

            response.data = usuario;
            response.message = 'Usuario actualizado correctamente.';

        } catch (error) {
            response.status = false;
            response.message = error.message
        }

        return response;

    }


    deleteUser( id ){

        const response = {
            status: true,
            message: '',
            data: null
        }

        try {

            const indexUser = this.users.findIndex( usuario => Number(usuario.id) === Number(id) );
            if( indexUser < 0 ){
                throw new Error(`Usuario con ID ${id} no existe.`);
            }

            const usuario = this.users[indexUser];

            this.users.splice( indexUser, 1 );

            fs.writeFileSync( this.dbPath, JSON.stringify( this.users ) );

            response.message = 'Usuario eliminado correctamente';
            response.data = usuario;

            
        } catch (error) {
            response.status = false;
            response.message = error.message;
        }

        return response;

    }


}


module.exports = User;

