require('dotenv').config(); 
const express = require('express');
const app = express();

module.exports = {
    
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',

    run: function() {
        const accountRoutes = require('./routes/account.route');
        const watchListRoutes = require('./routes/watch_list.route');
        const editProfileRoutes = require('./routes/profile.route');

        app.use('/account', accountRoutes);
        app.use('/account/watch_list', watchListRoutes);
        app.use('/account/editprofile', editProfileRoutes);

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    },
    
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    }
  };