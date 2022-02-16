const mysql = require('mysql');
const query = require('../../mysql/connetion');

module.exports = {
    getCategroy: async (categoryID) => {
        let selectSQL = categoryID
            ? mysql.format('select * from category where id = ? ', [categoryID])
            : `select * from category`;
        const result = await query(selectSQL);
        return categoryID ? result[0] : result;
    },
    updateCategroy: async ({ categoryID, value }) => {
        let updateSQL = ``;
    },
};
