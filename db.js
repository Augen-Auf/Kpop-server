const {Sequelize} = require('sequelize');

const devConnectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
const prodConnectionString =  process.env.DATABASE_URL + "?sslmode=require"
module.exports = new Sequelize(process.env.NODE_ENV === "production" ? prodConnectionString : devConnectionString);