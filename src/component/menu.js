import { FiFilePlus,FiCopy,FiGrid,FiPower} from "react-icons/fi";
import { AiOutlineUsergroupAdd} from "react-icons/ai";
import React from "react";
import {Link} from "react-router-dom";

const Menu=()=>{
    
    return (
        <div className="navigation">
            <ul>
                <li>
                    <Link to="#">
                        {/*<span className="icon"><div className="icons"><FiLayers/></div></span>*/}
                        <span className="title">北護期刊後台管理</span>
                    </Link>
                </li>
                <li>
                    <Link to="/CreatePost">
                        <span className="icon"><div className="icons"><FiFilePlus/></div></span>
                        <span className="title">新增期刊</span>
                    </Link>
                </li>
                <li>
                    <Link to="/PostList">
                        <span className="icon"><div className="icons"><FiCopy/></div></span>
                        <span className="title">期刊管理</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Category">
                        <span className="icon"><div className="icons"><FiGrid/></div></span>
                        <span className="title">分類管理</span>
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        <span className="icon"><div className="icons"><AiOutlineUsergroupAdd/></div></span>
                        <span className="title">成員管理</span>
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        <span className="icon"><div className="icons"><FiPower/></div></span>
                        <span className="title">Sign Out</span>
                    </Link> 
                </li>
            </ul>
        </div>
    )
}

export default Menu;