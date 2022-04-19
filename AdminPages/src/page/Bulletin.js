import React, { useState, useEffect } from "react";
import CreateBulletin from "../component/CreateBulletin.js";
import BulletinList from "../component/BulletinList.js";
const Bulletin = () => {
    const [bulletin, setBulletin] = useState([]);
    return (
        <>
            <div className="headerTitle">公告設定</div>
            <div className="pagecontent">
                <CreateBulletin setBulletin={setBulletin} bulletin={bulletin} />
                <BulletinList setBulletin={setBulletin} bulletin={bulletin} />
            </div>
        </>
    );
};

export default Bulletin;
