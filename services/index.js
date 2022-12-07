const pool = require('../db/mysql')
const UserSession = require('../models/user')

const index = async (res) => {
    try {
        const userID=res.get('userID');
        const userSession= await UserSession.findOne({'_id': userID});
        [rows] = await pool.execute('SELECT * FROM `users` WHERE `id` = ? ', [userSession.id_user])
        res.render('index', { title: rows[0].phone});
    } catch (e) {
      console.log(e)
    }
};

module.exports = index;