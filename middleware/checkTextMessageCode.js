const jwt = require('jsonwebtoken')

const UserSession = require('../models/user')
const { SESSION_SECRET } = require('../configs')

const checkTextMessageCode = async (req, res, next) => {

    try {
        if (req.body.phonecode && req.cookies.ajaxToken && req.cookies.timestamp) {


            if (req.body.phonecode != '111111111') {
                
                res.send(JSON.stringify({text: "Wrong verification code!" }))
            }

            else {

                const decoded = await jwt.verify(req.cookies.ajaxToken, SESSION_SECRET);

                if (decoded.timestamp != req.cookies.timestamp) {
                    res.send(JSON.stringify({ text: "Please try again!" }));
                }

                else {

                    const userID = await jwt.verify(req.cookies.userID, SESSION_SECRET).userID;

                    const userSession = new UserSession({ id_user: `${userID}` });

                    const sessionToken = await userSession.generateAuthToken();

                    await userSession.save();

                    res.cookie('sessionToken', sessionToken)

                    res.send(JSON.stringify({ text: `Successfully logged in!`}));

                    return;
                }
            }
        }

        else {
            next()
        }
    } catch (e) { console.log(e); res.send(JSON.stringify({ error:e }));}

}

module.exports = checkTextMessageCode;