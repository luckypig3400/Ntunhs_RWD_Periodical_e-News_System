import { AiOutlineMenu} from "react-icons/ai";
import { FiSearch} from "react-icons/fi";
import NtunhsLoGo from '../img/NtunhsLoGo.png'
const Title=()=>{
    return(
        <div className="main">
            <div className="topbar">
                <div className="search">
                    <label>
                        <input type="text" placeholder="Seach here"/>
                        <div className="icons"><FiSearch/></div>
                    </label>
                </div>
            </div>
        </div>
    )
}
export default Title;