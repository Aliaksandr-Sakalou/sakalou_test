const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const {SESSION_SECRET} = require('../configs')

const userSessionSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required: true,
        trim: true,
    },
    created: {
        type: Date, 
        default: Date.now,
        required:true,
        trim:true,
    },
    token: {
            type: String,
            required: true
    }
}, {
    timestamps: true
});

userSessionSchema.methods.generateAuthToken = async function () {
    const userSession = this;
    const token = jwt.sign({ _id: userSession._id.toString() }, SESSION_SECRET);
    userSession.token = token;
    await userSession.save();
    return token;
};

const UserSession = mongoose.model('UserSession', userSessionSchema);



module.exports = UserSession;