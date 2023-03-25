import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Nav2 = () => {
    return (
        <nav className="site-navigation works-page-nav">
            <ul className="nav-list works-page-nav-list">
                <li className="nav-list-item">
                    <Link to="/">
                        <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        >
                            <path d="M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z" />
                        </svg>
                        <p className="nav-item-text">Home</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav2;
