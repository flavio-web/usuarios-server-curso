
/* const path = require('path');
const fs = require('fs'); */

class User{

    constructor(){
        this.usuarios = [];
    }

    get users(){
        return require("../database/db.json");
    }
}


module.exports = User;

