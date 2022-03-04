const mysql = require("mysql");
const query = require("../../mysql/connetion");

module.exports = {
  get: async (categoryID) => {
    let selectSQL = categoryID ? mysql.format("select * from category where id = ? ", [categoryID]) : `select * from category`;
    const result = await query(selectSQL);
    return categoryID ? result[0] : result;
  },
  update: async ({ categoryID, value }) => {
    const exists = await query(`select exists(select 1 from category where id = '${categoryID}') as isExists`);
    if (value && !exists[0].isExists) {
      const putSQL = mysql.format("insert into category set ? ", { id: categoryID, name: value });
      await query(putSQL);
      return "Insert";
    } else {
      const putSQL = mysql.format("update category set name = ? where id = ? ", [value, categoryID]);
      await query(putSQL);
      return "Update";
    }
  },
  delete: async ({ categoryID }) => {
    const deleteSQL = mysql.format("delete from category where id = ?", [categoryID]);
    return await query(deleteSQL);
  },
};
