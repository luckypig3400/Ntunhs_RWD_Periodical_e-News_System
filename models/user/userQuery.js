const query = require('../../mysql/connetion');

module.exports = {
    register: async (user) => {
        try {
            let sql = `insert into user(name,username,password) values ('${user.name}','${user.username}','${user.password}')`;
            return await query(sql);
        } catch (e) {
            return e;
        }
    },
};
