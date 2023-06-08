import {TbMenu2} from "react-icons/tb"
import {AiOutlineMenu} from "react-icons/ai"
import {GiHamburgerMenu} from "react-icons/gi"
import {MdDashboardCustomize} from "react-icons/md"
import {TbUsers} from "react-icons/tb"
import {FaGripLinesVertical} from "react-icons/fa"

export const Burger = ({props}) => <TbMenu2 {...props} />
export const Burger2 = ({props, onClick}) => <AiOutlineMenu {...props} onClick={onClick}  />
export const Burger3 = ({props, onClick, className}) => <GiHamburgerMenu className={className} {...props} onClick={onClick} />
export const Dashboard = ({props, className}) => <MdDashboardCustomize {...props} className={className} />
export const User = ({props, className}) => <TbUsers className={className} {...props} />
export const SideBarMenu = (props) => <FaGripLinesVertical {...props} />