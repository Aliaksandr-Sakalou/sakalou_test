const mongoose = require('mongoose');
const {MONGO_CONNECTION_STRING} = require('../configs')

mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true

});