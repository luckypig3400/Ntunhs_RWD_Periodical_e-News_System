--
-- 資料庫: `periodical`
--
-- --------------------------------------------------------
--
-- 資料表結構 `category`
--
CREATE TABLE `category` (`id` varchar(255) NOT NULL,`name` varchar(255) DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- 傾印資料表的資料 `category`
--
INSERT INTO `category` (`id`, `name`) VALUES('C01', '頭條新聞'),('C02', '特別報導'),('C03', '每月一書'),('C04', '學術特區'),('C05', '校園尚青'),('C06', '心靈立可白'),('C07', '業務報導');
-- --------------------------------------------------------
--
-- 資料表結構 `content`
--
CREATE TABLE `content` (`Serial` int(11) NOT NULL,`NoID` varchar(50) DEFAULT NULL,`NoYear` varchar(4) DEFAULT NULL,`NoMonth` varchar(2) DEFAULT NULL,`NoClass` varchar(50) DEFAULT NULL,`Subject` varchar(50) DEFAULT NULL,`Writer` varchar(50) DEFAULT NULL,`StarID` int(11) DEFAULT NULL,`Email` varchar(50) DEFAULT NULL,`Content1` mediumtext DEFAULT NULL,`Content2` mediumtext DEFAULT NULL,`Content3` mediumtext DEFAULT NULL,`Photo1` varchar(50) DEFAULT NULL,`Photo2` varchar(50) DEFAULT NULL,`Photo3` varchar(50) DEFAULT NULL,`Alt1` varchar(50) DEFAULT NULL,`Alt2` varchar(50) DEFAULT NULL,`Alt3` varchar(50) DEFAULT NULL,`Temp1` varchar(15) DEFAULT NULL,`Temp2` varchar(15) DEFAULT NULL,`Temp3` varchar(15) DEFAULT NULL,`TempColor` varchar(50) DEFAULT NULL,`Link1` mediumtext DEFAULT NULL,`Link2` mediumtext DEFAULT NULL,`Link3` mediumtext DEFAULT NULL,`Linkloc1` varchar(50) DEFAULT NULL,`Linkloc2` varchar(50) DEFAULT NULL,`Linkloc3` varchar(50) DEFAULT NULL,`Linkalt1` varchar(50) DEFAULT NULL,`Linkalt2` varchar(50) DEFAULT NULL,`Linkalt3` varchar(50) DEFAULT NULL,`Counter` int(11) DEFAULT NULL,`Memo1` varchar(50) DEFAULT NULL,`Memo2` varchar(50) DEFAULT NULL,`Memo3` varchar(50) DEFAULT NULL,`Memo4` varchar(50) DEFAULT NULL,`Memo5` varchar(50) DEFAULT NULL,`TheDate` datetime DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- --------------------------------------------------------
--
-- 資料表結構 `periodical`
--
CREATE TABLE `periodical` (`id` int(11) NOT NULL,`periodNumber` varchar(50) DEFAULT NULL,`noYear` varchar(4) DEFAULT NULL,`noMonth` varchar(2) DEFAULT NULL,`categoryID` varchar(50) DEFAULT NULL,`subject` varchar(50) DEFAULT NULL,`writer` varchar(50) DEFAULT NULL,`quillcontent` mediumtext DEFAULT NULL,`cover` text DEFAULT NULL,`clicked` int(11) DEFAULT NULL,`updateTime` datetime DEFAULT current_timestamp()) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- 傾印資料表的資料 `periodical`
--
-- INSERT INTO `periodical` (`id`, `periodNumber`, `noYear`, `noMonth`, `categoryID`, `subject`, `writer`, `quillcontent`, `cover`, `clicked`, `updateTime`) VALUES
-- (1910, '216', '2021', '10', 'C02', '期刊文章測試', '撰文/學術服務組', '<p class=\"ql-align-center\"><img src=\"../periodical_data/00.7卷800.jpg\" alt=\"\"></p><p><br></p><p>測試</p><p><br></p>', '00.7卷800.jpg,,', 6, '2021-11-09 15:58:52');
-- --------------------------------------------------------
--
-- 資料表結構 `user`
--
CREATE TABLE `user` (`id` int(11) NOT NULL,`name` varchar(99) NOT NULL,`username` varchar(99) NOT NULL,`password` varchar(99) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- 傾印資料表的資料 `user`
--
INSERT INTO `user` (`id`, `name`, `username`, `password`) VALUES(1, 'admin', 'admin', '$2b$10$6q7Fu/p8RnWy3yu8eqkRwu0v9MD9z0vX.J8TGV/WQir3wPtqtrrCa');
--
-- 資料表索引 `category`
--
ALTER TABLE `category` ADD PRIMARY KEY (`id`);
--
-- 資料表索引 `content`
--
ALTER TABLE `content` ADD PRIMARY KEY (`Serial`);
--
-- 資料表索引 `periodical`
--
ALTER TABLE `periodical` ADD PRIMARY KEY (`id`);
--
-- 資料表索引 `user`
--
ALTER TABLE `user`  ADD PRIMARY KEY (`id`);
--
-- 使用資料表自動遞增(AUTO_INCREMENT) `periodical`
--
ALTER TABLE `periodical` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1916;
--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user`
--
ALTER TABLE `user` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;