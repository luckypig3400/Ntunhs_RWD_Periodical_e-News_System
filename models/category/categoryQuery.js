const mysql = require('mysql');
const query = require('../../mysql/connetion');

module.exports = {
    get: async (categoryID) => {
        let selectSQL = categoryID
            ? mysql.format('select * from category where id = ? ', [categoryID])
            : `select * from category`;
        const result = await query(selectSQL);
        return categoryID ? result[0] : result;
    },
    update: async ({ categoryID, value }) => {
        const exists = await query(`select exists(select 1 from category where id = '${categoryID}') as isExists`);
        let putSQL =
            value && !exists[0].isExists
                ? mysql.format('insert into category set ? ', { id: categoryID, name: value })
                : mysql.format('update category set name = ? where id = ? ', [value, categoryID]);
        return await query(putSQL);
    },
    delete: async ({ categoryID }) => {
        const deleteSQL = mysql.format('delete from category where id = ?', [categoryID]);
        const result = await query(deleteSQL);
        return result;
    },
};
