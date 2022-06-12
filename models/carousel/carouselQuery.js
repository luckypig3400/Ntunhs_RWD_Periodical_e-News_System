const mysql = require("mysql");
const query = require("../../mysql/connetion");

module.exports = {
  get: async (id) => {
    let selectSQL = id ? mysql.format("select * from carousel where id = ? ", [id]) : `select * from carousel`;
    const result = await query(selectSQL);
    return id ? result[0] : result;
  },
  update: async ({ id, postIDArray }) => {
    const exists = await query(`select exists(select 1 from carousel where id = '${id}') as isExists`);
    if (postIDArray && !exists[0].isExists) {
      const putSQL = mysql.format("insert into carousel set ? ", { id: id, name: postIDArray });
      await query(putSQL);
      return "Insert";
    } else {
      const putSQL = mysql.format("update carousel set name = ? where id = ? ", [postIDArray, id]);
      await query(putSQL);
      return "Update";
    }
  },
  delete: async ({ id }) => {
    const deleteSQL = mysql.format("delete from carousel where id = ?", [id]);
    return await query(deleteSQL);
  },
};
