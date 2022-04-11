import openpyxl
import mysql.connector
from mysql.connector import errorcode

# 資料庫參數設定
config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "db": "periodicalTest"
}

try:
    conn = mysql.connector.connect(
        host=config["host"],
        user=config["user"],
        password=config["password"]
    )
    # https://www.w3schools.com/python/python_mysql_create_db.asp
    # Ask user if he wish auto-create database
    userInput = input("Would you like to auto create database? (y/n)")
    if(userInput == "y"):
        print(userInput)
        cursor = conn.cursor()
        cursor.execute(
            "CREATE DATABASE IF NOT EXISTS {} DEFAULT CHARACTER SET 'utf8'".format(config["db"]))
        print("Database '{}' established".format(config["db"]))
        cursor.close()
        conn.close()
        conn = mysql.connector.connect(**config)
    print("Connection established")

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with the user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)
else:
    # 開啟工作簿
    workbook = openpyxl.load_workbook('newspaper.xlsx')
    # 獲取表單
    sheet = workbook['Content']
    # 讀取指定的單元格資料
    for j in range(1, sheet.max_row + 1):
        for i in range(1, sheet.max_column + 1):
            cell = sheet.cell(row=j, column=i).value
            createTableSQLcommand = "CREATE TABLE IF NOT EXISTS `content` (`Serial` int(11) NOT NULL,`NoID` varchar(50) DEFAULT NULL,`NoYear` varchar(4) DEFAULT NULL,`NoMonth` varchar(2) DEFAULT NULL,`NoClass` varchar(50) DEFAULT NULL,`Subject` varchar(50) DEFAULT NULL,`Writer` varchar(50) DEFAULT NULL,`StarID` int(11) DEFAULT NULL,`Email` varchar(50) DEFAULT NULL,`Content1` mediumtext DEFAULT NULL,`Content2` mediumtext DEFAULT NULL,`Content3` mediumtext DEFAULT NULL,`Photo1` varchar(50) DEFAULT NULL,`Photo2` varchar(50) DEFAULT NULL,`Photo3` varchar(50) DEFAULT NULL,`Alt1` varchar(50) DEFAULT NULL,`Alt2` varchar(50) DEFAULT NULL,`Alt3` varchar(50) DEFAULT NULL,`Temp1` varchar(15) DEFAULT NULL,`Temp2` varchar(15) DEFAULT NULL,`Temp3` varchar(15) DEFAULT NULL,`TempColor` varchar(50) DEFAULT NULL,`Link1` mediumtext DEFAULT NULL,`Link2` mediumtext DEFAULT NULL,`Link3` mediumtext DEFAULT NULL,`Linkloc1` varchar(50) DEFAULT NULL,`Linkloc2` varchar(50) DEFAULT NULL,`Linkloc3` varchar(50) DEFAULT NULL,`Linkalt1` varchar(50) DEFAULT NULL,`Linkalt2` varchar(50) DEFAULT NULL,`Linkalt3` varchar(50) DEFAULT NULL,`Counter` int(11) DEFAULT NULL,`Memo1` varchar(50) DEFAULT NULL,`Memo2` varchar(50) DEFAULT NULL,`Memo3` varchar(50) DEFAULT NULL,`Memo4` varchar(50) DEFAULT NULL,`Memo5` varchar(50) DEFAULT NULL,`TheDate` datetime DEFAULT NULL) CHARSET=utf8mb4;"
            if j == 1:
                print(str(i) + ":" + str(cell))
                # 列印欄位標題
                if i == sheet.max_column:
                    autoCreateTable = input(
                        "Would you like to auto create table? (y/n):")
                    if(autoCreateTable == "y"):
                        cursor = conn.cursor()
                        cursor.execute(createTableSQLcommand)
                        print("Table 'content' established")
                        conn.commit()
                        cursor.close()

            insertSQLcommand = ""
            if i == 1:
                print("current process ID:" + str(cell))
                insertSQLcommand += "INSERT INTO `content` VALUES(" + str(cell) + ","

            # 已讀取完該列的所有欄位資料(最後一欄)
            elif i == sheet.max_column:
                insertSQLcommand += str(cell) + ")"
                print("writing row data into DB...")
                cursor = conn.cursor()
                cursor.execute(insertSQLcommand)
                print("Inserted", cursor.rowcount, "row(s) of data.")
                conn.commit()
                print("Done.")
                cursor.close()

            # 其餘中間欄位資料
            else:
                insertSQLcommand += str(cell) + ","

conn.close()
print("Connection closed.")
