const jwt = require('jsonwebtoken');

const UserSession = require('../models/user');
const { SESSION_SECRET } = require('../configs')

const auth = async (req, res, next) => {

    try {

        const sessionToken = req.cookies.sessionToken;

        const decoded = await jwt.verify(sessionToken, SESSION_SECRET);

        const userSession = await UserSession.findOne({ '_id': decoded });

        if (!userSession) {
            res.redirect('/login');
            return;
        }

        res.append('userID', decoded._id)

        next();


    } catch (e) {
        console.log(e)
        res.redirect('/login');
        return;
    }
};

module.exports = auth;