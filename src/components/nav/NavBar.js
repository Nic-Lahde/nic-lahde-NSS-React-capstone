import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__profile">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            <li className="navbar__item navbar__my__games">
                <Link className="navbar__link" to="/myGames">My Games</Link>
            </li>
            <li className="navbar__item navbar__find__an__event">
                <Link className="navbar__link" to="/findEvent">Find Event</Link>
            </li>
            <li className="navbar__item navbar__host__an__event">
                <Link className="navbar__link" to="/hostEvent">Host Event</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kitchen_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}