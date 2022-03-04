const mysql = require("mysql");
const query = require("../../mysql/connetion");

module.exports = {
  register: async (user) => {
    let isExistSQL = `select exists(select 1 from user where username = '${user.username}') as isExists`;
    let insertSQL = mysql.format("insert into user set ?", user);
    const existsResult = await query(isExistSQL);
    return existsResult[0].isExists === 0 ? await query(insertSQL) : null;
  },
  login: async (user) => {
    let selectSQL = mysql.format("select * from user where username = ?", [user.username]);
    const result = await query(selectSQL);
    return !result.length ? null : result[0];
  },
  get: async () => {
    let selectSQL = mysql.format("select * from user");
    const result = await query(selectSQL);
    return result.map(({ password, ...other }) => ({ ...other })); //delete password from array
  },
  getByID: async ({ userID }) => {
    let selectSQL = mysql.format("select * from user where id = ?", [userID]);
    const result = await query(selectSQL);
    delete result[0].password;
    return result[0];
  },
  update: async ({ userID, data }) => {
    let updateSQL = mysql.format("update user set ? where id = ?", [data, userID]);
    return await query(updateSQL);
  },
  delete: async ({ userID }) => {
    let deleteSQL = mysql.format("delete from user where id = ?", [userID]);
    return await query(deleteSQL);
  },
};
