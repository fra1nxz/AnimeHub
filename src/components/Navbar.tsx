import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-items">
                    <h1 className="logo">AnimeHub</h1>
                </li>
                <li className="navbar-items">
                    <Link to='/'>Главная</Link>
                </li>
                <li className="navbar-items">
                    <Link to='/favorites'>Избранное</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;