require('dotenv').config(); 
const express = require('express');
const app = express();

module.exports = {
    
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    }
};