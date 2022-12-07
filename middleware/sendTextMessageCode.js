const pool = require('../db/mysql')
const { phone } = require('phone');
const jwt = require('jsonwebtoken')

const { SESSION_SECRET } = require('../configs')

const sendTextMessageCode = async (req, res, next) => {

    try {
 
        const phonenumber = phone('+' + req.body.phonenumber).phoneNumber;
        
        if (phonenumber) {
            if (req.cookies.ajaxToken) {
                res.send(JSON.stringify({text: "You're sending requests too fast!" }))
                return;
            }

                let userID;

                [rows] = await pool.execute('SELECT * FROM `users` WHERE `phone` = ? ', [phonenumber])

                if (rows[0]) { userID = rows[0].id }

                else {
                    let result = await pool.execute('INSERT INTO `users` (phone) VALUES (?)', [phonenumber])
                    userID = result[0].insertId;
                }

                const timestamp = Date().toString();
                const cookieAge = 1000 * 60;
                const timestampString = timestamp.toString();
                const ajaxToken = jwt.sign({ timestamp: timestampString }, SESSION_SECRET, { expiresIn: '120s' });
                const userIDCookie = jwt.sign({ userID: userID }, SESSION_SECRET, { expiresIn: '120s' });

                res.cookie('timestamp', timestampString, { maxAge: cookieAge });
                res.cookie('ajaxToken', ajaxToken, { maxAge: cookieAge });
                res.cookie('userID', userIDCookie, { maxAge: cookieAge });

                res.send(JSON.stringify({ text: "A verification code, valid for two minutes, was sent to the phone number you provided" }));
             
                return;
        }

        else { 

            res.send(JSON.stringify({ text: "Please enter a correct phone number with a country code" }));

        }
    } catch (e) {  res.status(500).send() }
    next();
}

module.exports = sendTextMessageCode;