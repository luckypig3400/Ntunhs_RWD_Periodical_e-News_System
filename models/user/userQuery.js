const mysql = require('mysql');
const query = require('../../mysql/connetion');

module.exports = {
    register: async (user) => {
        let isExistSQL = `select exists(select 1 from user where username = '${user.username}') as isExists`;
        let insertSQL = mysql.format('insert into user set ?', user);
        const existsResult = await query(isExistSQL);
        return existsResult[0].isExists === 0 ? await query(insertSQL) : null;
    },
    login: async (user) => {
        let selectSQL = mysql.format('select * from user where username = ?', [user.username]);
        const result = await query(selectSQL);
        return !result.length ? null : result[0];
    },
};
