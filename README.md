# Ntunhs_RWD_Periodical_e-News_System
北護RWD校刊系統
**本分支已整合前後端**

## How to deploy
1. Clone or download this repo as Zip
2. Unzip and move the whole folder in ```Your Xampp installed directory```/htdocs/
3. Unzip ```DB/DB_ver5....7z``` and import to MySQL Server
4. Download [Periodical Data Ver1](http://gg.gg/ntunhsPeriodicalData) then unzip & place in the root of this repo folder
5. Update ```.ENV``` file config
6. Run ```npm install``` in project root folder & ```AdminPages/```
7. In this folder(project root) run ```node server.js```
8. In ```AdminPages/``` run ```npm start```
9. Finished! Visit [localhost](http://localhost/Ntunhs_RWD_Periodical_e-News_System/) & [localhost:3080](http://localhost:3080/) to test ~

---

## About .ENV
### 記得更新裡面的設定
JWT_SECRECT_KEY=
這行要記得更新

---
## 雲端資料共用

### 日後整理過的校刊資料大家都可以放在這裡 方便存取與整理

+ http://gg.gg/ntunhsPeriodicalData

#### 下載起來的壓縮檔直接右鍵解壓至此，並整個資料夾移至專案根目錄即可

### 有需要教務處舊伺服器的完整原始資料可於此下載

+ http://gg.gg/ntunhsOriginalSeverData

---