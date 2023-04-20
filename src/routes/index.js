const homeRouter = require('./home.route');
const accountRouter = require('./account.route');

function routes(app) {

    app.use('/', homeRouter);
    app.use('/account', accountRouter);
}

module.exports = routes;