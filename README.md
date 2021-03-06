# Ntunhs_RWD_Periodical_e-News_System
北護RWD校刊系統
**本分支已整合前後端**

## How to deploy
1. Clone or download this repo as Zip

2. Unzip and move the whole folder in ```Your Xampp installed directory```/htdocs/

3. Download [DB_ver12](https://drive.google.com/file/d/1r0Pwue3MmSekcn4Mm0BSt1HQxHi6l5-B/view?usp=sharing) then unzip ```DB_ver12....7z``` and import to MySQL Server.
    1. <mark>Important!</mark> Then please execute the SQL command below to update to the latest Database version!
    ```
    ALTER TABLE `announcement` CHANGE `dateTime` `dateTime` VARCHAR(168) NULL;
    ```
    ![](https://i.imgur.com/mxckG5G.png)

4. Download [Periodical Data Ver4](https://drive.google.com/drive/folders/10eHoKCvKEl7FrbJsVBS_daMXckF6rDxJ?usp=sharing) then unzip & move the ```public``` folder into the root of this repo folder

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

## 20220616會議後 TO-DO List
- [x] 更新carousel table column name
- [x] 文章總覽的背景色刷成漸層淡藍色
- [x] 前往查看歷期頭條、歷期特別報導(把這行字的顏色也改成棗紅色，Word選擇文字顏色最左邊的深紅色#FF8686)
- [x] 最新公告冒號拿掉，字體放大 加上白邊（改成黑色陰影）
- [x] 最新公告的背景圖改成風格化雲彩圖片(校園天空)
- [x] 聯繫我們 改為 教務處 學術服務組，連結改成新版學術服務組網頁
- [x] 關於北護：改為新版的介紹
- [x] 下方三個icon都拿掉 改為發行所 國立台北護理健康大學
- [x] 最新消息改為頭條報導

---
## 雲端資料共用

### 日後整理過的校刊資料大家都可以放在這裡 方便存取與整理

+ http://gg.gg/ntunhsPeriodicalData

#### 下載起來的壓縮檔直接右鍵解壓至此，並整個資料夾移至專案根目錄即可

### 有需要教務處舊伺服器的完整原始資料可於此下載

+ http://gg.gg/ntunhsOriginalSeverData

---