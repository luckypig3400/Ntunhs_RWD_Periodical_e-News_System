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
- [ ] 文章點閱計數器 (透過GET http://${HostName}/periodical/api/post/${id} 來更新該篇文章的點閱次數)
- [x] 改善首頁文字顏色對比度(使用shadow)
- [ ] 修正搜尋頁面螢光標註BUG

---

## 20220330會議後 TO-DO List
- [x] 1.項目順序調整，後台可調整學刊順序(照第八項:採用文章重要程度排序)
- [x] 2.首頁背景圖片亮度調整
- [ ] 3.手機圖片顯示比例不齊
- [x] 4.手機版不要折疊類別導覽列(手機模式自動展開)
- [ ] 5.首頁的輪播圖縮小，至少能看到下面的文章
- [x] 6.標題文字斷行，自定義（抓空白以及特殊符號如:，、等）
- [ ] 7.刪除使用者的功能
- [x] 8.文章排序，最新的顯示在最上面，可按重要程度排序
- [ ] 9.新增公告跑馬燈
- [x] 10.env新增圖片和影片存檔路徑(統一採用public資料)
- [x] 11.首頁加校徽
- [x] 12.搜尋按鍵加文字
- [x] 13."我要投稿"改成"聯繫我們"
- [x] 14.完成搜尋頁面功能(有Bug要修正)

## 20220427會議後 TO-DO List
- [ ] 前往查看歷期頭條報導，一頁顯示六篇，可以下一頁
- [x] 更改投稿email
- [x] 聯繫資訊更改，電子期刊編輯部：學術服務組，將學校地址移到最下方
- [ ] 搜尋結果依據期別倒序
- [ ] 隱藏每月一書(219期以後)
- [ ] 預設字體大小縮小
- [x] 文章標題不要斜體
- [ ] 資料來源靠右顯示
- [ ] 最新公告顯示(首頁下方跑馬燈)
- [ ] 220期以後的首頁背景圖不要模糊化   
- [ ] 支援圖片裁切功能
- [ ] Cover疊圖在首頁背景校園圖上

---
## 雲端資料共用

### 日後整理過的校刊資料大家都可以放在這裡 方便存取與整理

+ http://gg.gg/ntunhsPeriodicalData

#### 下載起來的壓縮檔直接右鍵解壓至此，並整個資料夾移至專案根目錄即可

### 有需要教務處舊伺服器的完整原始資料可於此下載

+ http://gg.gg/ntunhsOriginalSeverData

---