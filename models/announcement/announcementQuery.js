const mysql = require('mysql')
const query = require('../../mysql/connetion')

module.exports = {
    get: async announcementID => {
        let selectSQL = announcementID
            ? mysql.format('select * from announcement where id = ? ', [announcementID])
            : `select * from announcement`
        const result = await query(selectSQL)
        return announcementID ? result[0] : result
    },
    create: async ({ text,dateTime }) => {
        const postSQL = mysql.format('insert into announcement set ? ', { text ,dateTime})
        return await query(postSQL)
    },
    delete: async ({ announcementID }) => {
        const deleteSQL = mysql.format('delete from announcement where id = ?', [announcementID])
        return await query(deleteSQL)
    },
}
