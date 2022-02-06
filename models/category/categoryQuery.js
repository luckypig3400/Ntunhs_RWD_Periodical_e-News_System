const query = require('../../mysql/connetion');

module.exports = {
    getCategroy: async (categoryID) => {
        let selectSQL = categoryID ? `select * from category where id = '${categoryID}'` : `select * from category`;
        const result = await query(selectSQL);
        return result;
    },
    createCategroy: async ({ value }) => {
        let insertSQL = `insert into category (id,item) values () `;
        const result = await query(insertSQL);
        return result;
    },
};
