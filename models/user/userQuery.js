const query = require("../../mysql/connetion");

module.exports = {
  register: async (user) => {
    let isExistSQL = `select exists(select 1 from user where username = '${user.username}') as isExists`;
    let insertSQL = `insert into user(name,username,password) values ('${user.name}','${user.username}','${user.password}')`;
    const existsResult = await query(isExistSQL);
    return existsResult[0].isExists ? await query(insertSQL) : null;
  },
  login: async (user) => {
    let selectSQL = `select * from user where username = '${user.username}'`;
    const result = await query(selectSQL);
    return !result.length ? null : result[0];
  },
};
