require('dotenv').config();
require('./passport-setup');
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use('/api', router);
app.use(cookieSession({
    name: 'k-man-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize(undefined));
app.use(passport.session(undefined));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

//Обработка ошибок, последний Middleware
app.use(errorHandler);

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e)
    }
};


start();
