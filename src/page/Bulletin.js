import React, { useState, useEffect } from "react";
import CreateBulletin from "../component/CreateBulletin.js";
import BulletinList from "../component/BulletinList.js";
const Bulletin = () => {
    return (
        <>
            <div className="headerTitle">公告設定</div>
            <div className="pagecontent">
                <CreateBulletin/>
                <BulletinList/>
            </div>
        </>
    );
};

export default Bulletin;
