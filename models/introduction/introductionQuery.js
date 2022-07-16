const mysql = require("mysql");
const query = require("../../mysql/connetion");

module.exports = {
    get: async (introductionID) => {
        let selectSQL = introductionID
            ? mysql.format("select * from introduction where id = ? ", [
                  introductionID,
              ])
            : `select * from introduction`;
        const result = await query(selectSQL);
        return introductionID ? result[0] : result;
    },
    update: async ({ introductionID, value }) => {
        const exists = await query(
            `select exists(select 1 from introduction where id = '${introductionID}') as isExists`
        );
        if (value && !exists[0].isExists) {
            const putSQL = mysql.format("insert into introduction set ? ", {
                id: introductionID,
                name: value,
            });
            await query(putSQL);
            return "Insert";
        } else {
            const putSQL = mysql.format(
                "update introduction set value = ? where id = ? ",
                [value, introductionID]
            );
            await query(putSQL);
            return "Update";
        }
    },
};
