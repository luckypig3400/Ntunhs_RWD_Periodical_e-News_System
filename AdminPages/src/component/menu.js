import {
    FiFilePlus,
    FiCopy,
    FiGrid,
    FiPower,
    FiDatabase,
    FiFilm,
} from "react-icons/fi";
import SettingsIcon from "@mui/icons-material/Settings";
import {
    AiOutlineUsergroupAdd,
    AiFillSound,
    AiOutlineMail,
} from "react-icons/ai";
import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className="navigation">
            <ul>
                <li>
                    <Link to="#">
                        <span className="logo">北護期刊後台管理</span>
                        {/* <img className="logo" src={require("../img/Logo.png")} ></img> */}
                    </Link>
                </li>
                <li>
                    <Link to="/CreatePost">
                        <span className="icon">
                            <div className="icons">
                                <FiFilePlus />
                            </div>
                        </span>
                        <span className="title">新增期刊</span>
                    </Link>
                </li>
                <li>
                    <Link to="/PostList">
                        <span className="icon">
                            <div className="icons">
                                <FiCopy />
                            </div>
                        </span>
                        <span className="title">期刊管理</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Category">
                        <span className="icon">
                            <div className="icons">
                                <FiGrid />
                            </div>
                        </span>
                        <span className="title">分類管理</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Carousel">
                        <span className="icon">
                            <div className="icons">
                                <FiFilm />
                            </div>
                        </span>
                        <span className="title">輪播管理</span>
                    </Link>
                </li>
                <li>
                    <Link to="/MailCanva">
                        <span className="icon">
                            <div className="icons">
                                <AiOutlineMail />
                            </div>
                        </span>
                        <span className="title">海報管理</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Setting">
                        <span className="icon">
                            <div className="icons">
                                <SettingsIcon />
                            </div>
                        </span>
                        <span className="title">進階設定</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Signout">
                        <span className="icon">
                            <div className="icons">
                                <FiPower />
                            </div>
                        </span>
                        <span className="title">Sign Out</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
