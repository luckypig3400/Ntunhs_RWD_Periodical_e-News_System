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
    for j in range(2, 94):

        for i in range(1, 95):
            cell = sheet.cell(row=j, column=i).value
            # if j == 1:
            #     print(str(i) + ":" + str(cell))
            #     # 列印欄位標題
            if i == 2:
                MEETING_TITLE = cell
                print('存檔MEETING_TITLE')
             
            if i >= 14 and i <= 53:
                if str(cell) != "":
                    MEETING_ATTACH_NAME += str(cell)
                    MEETING_ATTACH_NAME += ","
                    # print(MEETING_ATTACH_NAME)
            if i >= 54 and i <= 93:
                if i == 54:
                    MEETING_DOC_NAME = str(cell)
                if str(cell) != "":
                    MEETING_ATTACH_LINK += str(cell)
                    MEETING_ATTACH_LINK += ","
                    # print(MEETING_ATTACH_LINK)
            if i == 94:
                print("94:" + str(cell))
                cursor = conn.cursor()
                cursor.execute("INSERT INTO meeting_records (MEETING_TITLE,MEETING_NUMBER,MEETING_DATE,MEETING_TIME,MEETING_VENUE,MEETING_CHARPERSON,MEETING_PARTICIPANT,MEETING_MINUTE,MEETING_TEXT,MEETING_DOC_NAME,MEETING_ATTACH_NAME) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);", (
                    MEETING_TITLE, MEETING_NUMBER, MEETING_DATE, MEETING_TIME, MEETING_VENUE, MEETING_CHARPERSON, MEETING_PARTICIPANT, MEETING_MINUTE, MEETING_TEXT, MEETING_DOC_NAME, MEETING_ATTACH_LINK))
                print("Inserted", cursor.rowcount, "row(s) of data.")
                conn.commit()
                print("Done.")
                cursor.close()

        conn.close()
        print("Connection closed.")
