const mysql = require('mysql');
const query = require('../../mysql/connetion');

module.exports = {
    getPosts: async ({ page, sort_by, order_by }) => {
        page = (parseInt(page) - 1) * 10;
        let selectSQL = `select * from periodical order by ${sort_by} ${order_by} limit ${page},20 `;
        const results = await query(selectSQL);
        const total = await query(`select count(*) as count from periodical`);
        return { results, totalCount: total[0].count };
    },
    getPostByQuery: async ({ content, writer, category_id, subject, page }) => {
        let searchSQL = `select *  from periodical where 1 `;
        [content, writer, category_id, subject].forEach((item) => {
            if (!item) return;
            switch (item) {
                case content:
                    searchSQL += `and quillcontent like '%${item}%'`;
                    break;
                case writer:
                    searchSQL += `and writer like '%${item}%'`;
                    break;
                case category_id:
                    searchSQL += `and categoryID like '%${item}%'`;
                    break;
                case subject:
                    searchSQL += `and subject like '%${item}%'`;
                    break;
            }
        });
        const total = await query(`select count(*) as count from (${searchSQL}) final`);
        const results = await query(`${searchSQL} limit ${page},20 `);
        return { results, totalCount: total[0].count };
    },
    getPostByID: async ({ postID }) => {
        let selectSQL = mysql.format('select * from periodical where id = ?', [postID]);
        const result = await query(selectSQL);
        return result[0];
    },
    createPost: async (data) => {
        let insertSQL = mysql.format('insert into periodical set ?', data);
        const result = await query(insertSQL);
        return result;
    },
};
