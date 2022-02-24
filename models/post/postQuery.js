const mysql = require('mysql');
const query = require('../../mysql/connetion');

module.exports = {
    get: async ({ page, sort_by, order_by, limit }) => {
        page = (parseInt(page) - 1) * 10;
        let selectSQL = `select * from periodical order by ${sort_by} ${order_by} limit ${page},${limit} `;
        const results = await query(selectSQL);
        const total = await query(`select count(*) as count from periodical`);
        return { results, totalCount: total[0].count };
    },
    getByQuery: async ({ content, writer, category_id, subject, period_number, page, sort_by, order_by, limit }) => {
        let searchSQL = `select * from periodical where 1 `;
        [content, writer, category_id, subject, period_number].forEach((item) => {
            if (!item) return;
            switch (item) {
                case content:
                    searchSQL += ` and quillcontent like '%${item}%'`;
                    break;
                case writer:
                    searchSQL += ` and writer like '%${item}%'`;
                    break;
                case category_id:
                    searchSQL += ` and categoryID like '%${item}%'`;
                    break;
                case subject:
                    searchSQL += ` and subject like '%${item}%'`;
                    break;
            }
        });
        const total = await query(`select count(*) as count from (${searchSQL}) final`);
        const results = await query(`${searchSQL} order by ${sort_by} ${order_by} limit ${page},${limit} `);
        return { results, totalCount: total[0].count };
    },
    getByID: async ({ postID }) => {
        let selectSQL = mysql.format('select * from periodical where id = ?', [postID]);
        //increment clicked
        await query(mysql.format('update periodical set clicked = clicked + 1 where id = ?', [postID]));
        const result = await query(selectSQL);
        return result[0];
    },
    create: async (data) => {
        let insertSQL = mysql.format('insert into periodical set ?', data);
        const result = await query(insertSQL);
        return result;
    },
};
