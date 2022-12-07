require('dotenv').config()

exports.PORT=process.env.PORT

exports.MONGO_CONNECTION_STRING=process.env.MONGO_CONNECTION_STRING

exports.SESSION_SECRET= process.env.SESSION_SECRET

exports.IS_PRODUCTION=process.env.NODE_ENV==='production'

exports.MYSQL_DATABASE_NAME=process.env.MYSQL_DB_NAME
exports.MYSQL_DATABASE_HOST=process.env.MYSQL_DB_HOST
exports.MYSQL_DATABASE_USER=process.env.MYSQL_DB_USER
exports.MYSQL_DATABASE_PASSWORD=process.env.MYSQL_DB_PASSWORD
