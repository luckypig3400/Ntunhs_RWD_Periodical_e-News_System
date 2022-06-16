# Ntunhs_RWD_Periodical_e-News_System
北護RWD校刊系統
**本分支已整合前後端**

## How to deploy
1. Clone or download this repo as Zip

2. Unzip and move the whole folder in ```Your Xampp installed directory```/htdocs/

3. Unzip ```DB/DB_ver8....7z``` and import to MySQL Server

    <mark>Important:</mark> Version above 1.2.6 please use [```DB_ver9....7z```](https://drive.google.com/file/d/1pssaNHwMz22A3kRDO7V3WzGuNzRa6gVl/view?usp=sharing) ,or just simply run the sql commands below after you import the ```DB_ver8``` to make Announcement function work properly !

    ```=sql
    CREATE TABLE `announcement` (
      `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
      `text` varchar(100) DEFAULT NULL,
      `dateTime` datetime DEFAULT current_timestamp()
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    -- https://www.w3schools.com/sql/sql_autoincrement.asp
    ```

    * **3-2:** Then run this SQL command to fix the default clicked value bug

    ```=sql
    ALTER TABLE `periodical` CHANGE `clicked` `clicked` INT(11) NULL DEFAULT '0';
    ```

    * **3-3:** Version above 1.5.6 must run this sql command to support Carousel Setting function!
    ```=sql
    CREATE TABLE IF NOT EXISTS carousel(periodNumber int NOT NULL PRIMARY KEY, postIDArray varchar(100) DEFAULT "");
	ALTER TABLE `carousel` CHANGE `periodNumber` `id` INT(11) NOT NULL;
    ```

4. Download [Periodical Data Ver2](http://gg.gg/ntunhsPeriodicalData) then unzip & move the ```public``` folder into the root of this repo folder

5. Update ```.ENV``` file config [可參考這裡](#about-env)

6. Run ```npm install``` in **Project Root Folder** & ```AdminPages/```

7. **Admin Pages Build method**:
    
    1. Inside ```AdminPages/``` folder run ```npm run build``` wait until build finished
    2. Go to ```AdminPages/build/``` then move all files into ```AdminPages/```

8. **Start Backend Server**:
    1. In this Project Root Folder run ```node server.js```
    2. (or you may use ```pm2 start server.js``` if you prefer to)

9. **Finished! & Test** 
    * **NewsPage:** Visit [localhost/```thisProjectFolderName/```](http://localhost/Ntunhs_RWD_Periodical_e-News_System/)
    * **Admin Pages:** Visit [localhost/```thisProjectFolderName```/AdminPages/](http://localhost/Ntunhs_RWD_Periodical_e-News_System/AdminPages/)

---

## Deploy於教務處Server上的小筆記

### 避免跨域請求的BUG記得把後端透過Proxy轉到443 port

Proxy設定範例(httpd.conf)
```
LoadModule proxy_http_module modules/mod_proxy_http.so
ProxyPass /Periodical-Backend http://localhost:3090
ProxyPassReverse /Periodical-Backend http://localhost:3090
```
#### [Xampp ReverseProxy啟用教學](https://dotblogs.com.tw/jses88001/2014/04/17/144782)

### 然後記得更改前端config再重新build
前端設定範例(AdminPages/src/config/default.json)
```
{
    "hashRouter": "#",
    "apiURL": "https://acadsys.ntunhs.edu.tw/Periodical-Backend/periodical",
    "imageURL": "https://acadsys.ntunhs.edu.tw/Periodical-Backend"
}
```

---

## About .ENV
### 記得更新裡面的設定
+ **WEB_ORIGIN_URL=** 這行記得改成Server的Domain Name
(架在本機端80 port就用http://localhost)
+ **JWT_SECRECT_KEY=**
這行一定要記得更新

---
## 雲端資料共用

### 日後整理過的校刊資料大家都可以放在這裡 方便存取與整理

+ http://gg.gg/ntunhsPeriodicalData

#### 下載起來的壓縮檔直接右鍵解壓至此，並整個資料夾移至專案根目錄即可

### 有需要教務處舊伺服器的完整原始資料可於此下載

+ http://gg.gg/ntunhsOriginalSeverData

---