import React, { useState, useEffect } from "react";
import CarouselDataGrid from "../component/Carousel/CarouselDataGrid";

const Carousel = () => {
    return (
        <>
            <div className="headerTitle">輪播圖管理</div>
            <div className="pagecontent"><CarouselDataGrid/></div>
        </>
    );
};

export default Carousel;
