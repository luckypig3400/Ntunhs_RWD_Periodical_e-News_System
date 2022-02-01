const query = require('../../mysql/connetion');

module.exports = {
    register: async (user) => {
        try {
            let isExistSQL = `select * from user where username = '${user.username}'`;
            let insertSQL = `insert into user(name,username,password) values ('${user.name}','${user.username}','${user.password}')`;
            const exists = await query(isExistSQL);
            return !exists.length ? await query(insertSQL) : null;
        } catch (e) {
            return e;
        }
    },
    login: async (user) => {
        try {
            let selectSQL = `select * from user where username = '${user.username}'`;
            const result = await query(selectSQL);
            return !result.length ? null : result[0];
        } catch (e) {
            return e;
        }
    },
};
