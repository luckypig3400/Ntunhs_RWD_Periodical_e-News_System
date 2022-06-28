# Ntunhs_RWD_Periodical_e-News_System
北護RWD校刊系統
(前後端放置於不同分支，各分支獨立不干擾彼此)
測試或實際部署系統時，切換分支並複製該分支內的所有資料
另外放置於其他沒有git的資料夾內即可運行

## Frontend News Pages
前端新聞顯示頁面
由在下來編寫與維護
---

## TO-DO List
- [x] 首頁橫幅大輪播圖，改為亮色系
- [x] 錯字蓋覽 -> 概覽
- [x] 首頁新聞概覽，點標題直接進入文章
- [x] 文章點閱計數器 (透過GET http://${HostName}/periodical/api/post/${id} 來更新該篇文章的點閱次數)
- [x] 改善首頁文字顏色對比度(使用shadow)
- [x] 修正搜尋頁面螢光標註BUG(改用傳遞參數並由JS GET搜尋參數，並於完整內文頁面中搜尋)
- [x] 首頁輪播圖大標縮小並加上文字框線
- [x] 公告跑馬燈新增底圖淺淺的底紋(雲紋之類的)，比較不會單調，然後跑馬燈字改為棗紅色(#c32136)
- [x] 字體縮放功能嘗試只縮放 p 和所有 h1 , h2  ... 標籤的文字大小(提供僅調整內文字體的功能)
- [x] 輪播圖標題字體調大(要比內文大，目前初判是記憶頁面字體大小的功能有Bug造成顯示異常)
- [x] 首頁輪播圖根據資料庫carousel table來撈取
- [x] 前後台文章顯示順序要相同(以id與類別排序)
- [x] 首頁蓋覽圖顯示優化
- [ ] Visitor counter限制使用[IP](https://stackoverflow.com/questions/3003145/how-to-get-the-client-ip-address-in-php)或是[Session](https://stackoverflow.com/questions/43696936/simple-php-page-session-visit-counter-not-working)來限制
- [x] 頁面上方【學術特區】拉出來、【聯繫我們】刪掉
- [x] 首頁鳳凰照片風格化
- [x] 類別改棗紅字、其他改深藍字 (首頁前往查看...那行字)
- [ ] 圖片限制上傳改為5MB (無法上傳就知道圖片太大了)
- [x] 首頁輪播圖標題，只用半形空白作為段行符號就好
- [x] 瀏覽完整文章頁面的預設字體大小調整為"正常"

---

## 20220330會議後 TO-DO List
- [x] 1.項目順序調整，後台可調整學刊順序(照第八項:採用文章重要程度排序)
- [x] 2.首頁背景圖片亮度調整
- [x] 3.手機圖片顯示比例不齊(避免圖片變形，改為統一限制高度為369px)
- [x] 4.手機版不要折疊類別導覽列(手機模式自動展開)
- [x] 5.首頁的輪播圖縮小，至少能看到下面的文章(不縮小，但採用於下方顯示最新公告文字)
- [x] 6.標題文字斷行，自定義（抓空白以及特殊符號如:，、等）
- [x] 7.刪除使用者的功能
- [x] 8.文章排序，最新的顯示在最上面，可按重要程度排序
- [x] 9.新增公告跑馬燈(因最新公告通常只有1則，因此目前以單一文字區塊的方式呈現在首頁下方)
- [x] 10.env新增圖片和影片存檔路徑(統一採用public資料)
- [x] 11.首頁加校徽
- [x] 12.搜尋按鍵加文字
- [x] 13."我要投稿"改成"聯繫我們"
- [x] 14.完成搜尋頁面功能(有Bug要修正)

## 20220427會議後 TO-DO List
- [x] 前往查看歷期頭條報導，一頁顯示六篇，可以下一頁
- [x] 更改投稿email
- [x] 聯繫資訊更改，電子期刊編輯部：學術服務組，將學校地址移到最下方
- [x] 搜尋結果依據期別倒序
- [x] 隱藏每月一書(219期以後)
- [x] 預設字體大小縮小(還新增了記住目前字體設定並自動載入)
- [x] 文章標題不要斜體
- [x] 資料來源靠右顯示
- [x] 最新公告顯示(使用PHP發送GET請求至後端api)
- [x] 220期以後的首頁背景圖不要模糊化(已全部取消模糊化效果，改為將圖片覆蓋於校園背景上)
- [x] 支援圖片裁切功能(管理頁面，調整圖片於內文大小)
- [x] Cover疊圖在首頁背景校園圖上

## 20220530會議後 TO-DO List
- [x] 首頁輪播圖片大小改為contain
- [x] 公告跑馬燈 marquee
- [x] 首頁字體加上陰影（參考聯合時報網站）
- [x] 首頁輪播圖片柔邊加圓角形框(改為疊圖在校景鳳凰圖上)
- [x] 首頁校園背景圖模糊化(改為採用新的鳳凰圖，不模糊化)
- [x] 前往查看歷期頭條/分類報導
- [x] 文章摘要過濾html碼
- [x] 輪播文章設定（要提供排序）
- [x] 最新公告區塊顏色改為櫻花色(#e5227b) 
- [x] 沒有封面的預設圖片改為鳳凰校景
- [x] 首頁提示往下滑的標誌(改為把閱讀更多顯示得更顯眼)
- [x] 首頁公告區塊增加預設文字 “最新公告：”
- [x] 標題斷行設定（統一全形的標點符號不要斷，半形的標點符號作為斷行表示）
- [x] 管理頁面直接快速跳選頁碼
- [x] 管理頁面row per page 50筆資料

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