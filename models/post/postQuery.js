const query = require("../../mysql/connetion");

module.exports = {
  getPosts: async ({ page, sort_by, order_by, category_id }) => {
    page = (parseInt(page) - 1) * 10;
    let selectSQL = category_id
      ? `select * from periodical where categoryID = '${category_id}' order by ${sort_by} ${order_by} limit ${page},20 `
      : `select * from periodical order by ${sort_by} ${order_by} limit ${page},20 `;
    const result = await query(selectSQL);
    return result;
  },
  getPostByID: async ({ postID }) => {
    let selectSQL = `select * from periodical where id = ${postID} `;
    const result = await query(selectSQL);
    return result[0];
  },
  createPost: async ({ periodNumber, noYear, noMonth, categoryID, subject, writer, content }) => {
    let insertSQL = `insert into periodical (periodNumber,noYear,noMonth,categoryID,subject,writer,content) values ('${periodNumber}','${noYear}','${noMonth}','${categoryID}','${subject}','${writer}','${content}') `;
    const result = await query(insertSQL);
    return result;
  },
};
