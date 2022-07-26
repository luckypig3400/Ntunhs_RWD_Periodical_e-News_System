import React, { useState, useEffect } from "react";
import CreateBulletin from "../component/CreateBulletin.js";
import BulletinList from "../component/BulletinList.js";
const Bulletin = () => {
    return (
        <>
            <CreateBulletin />
            <BulletinList />
        </>
    );
};

export default Bulletin;
