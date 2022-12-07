const jwt = require('jsonwebtoken')

const UserSession = require('../models/user')
const { SESSION_SECRET } = require('../configs')

const logout = async (req, res, next) => {

    try {

        const token = req.cookies.sessionToken;

        const decoded = await jwt.verify(token, SESSION_SECRET);

        const userSession = await UserSession.findOne({ '_id': decoded._id });

        if (userSession) {
            await userSession.remove();

            res.send("You've been logged out!");
            return;
        }

        else {
            res.send("You aren't logged in!");
            return;
        }
        
    } catch (e) { 
        console.log(e); 
        res.send("Something went wrong:"+e);
    
    }

    next();
}

module.exports = logout;