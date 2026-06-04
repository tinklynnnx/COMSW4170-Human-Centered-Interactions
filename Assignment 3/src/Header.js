import './App.css';
import { Link } from 'react-router-dom';
function Header() {

    return (
        <header className="header" id="header">
            <div className="top-nav">
                <div className="container d-flex">
                    <p>Order Online or Call Us: (001) 222-5555</p>
                    <ul className="d-flex">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="navigation">
                <div className="nav-center container d-flex">
                    <a href="index.html" className="logo"><h1>Greenthread</h1></a>

                    <ul className="nav-list d-flex">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a href="#shop" className="nav-link">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a href="#terms" className="nav-link">Terms</a>
                        </li>
                        <li className="nav-item">
                            <a href="#about" className="nav-link">About</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link">Contact</a>
                        </li>
                        <li className="icons d-flex">
                                <i className="bx bx-user"></i>
                            <div className="icon">
                                <i className="bx bx-search"></i>
                            </div>
                            <div className="icon">
                                <i className="bx bx-heart"></i>
                                <span className="d-flex">0</span>
                            </div>
                            <Link to="/cart" className="icon">
                                <i className="bx bx-cart"></i>
                                <span className="d-flex">0</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="icons d-flex">
                        <div className="icon">
                            <i className="bx bx-user"></i>
                        </div>
                        <div className="icon">
                            <i className="bx bx-search"></i>
                        </div>
                        <div className="icon">
                            <i className="bx bx-heart"></i>
                            <span className="d-flex">0</span>
                        </div>
                        <Link to="/cart" className="icon">
                            <i className="bx bx-cart"></i>
                            <span className="d-flex">0</span>
                        </Link>
                    </div>

                    <div className="hamburger">
                        <i className="bx bx-menu-alt-left"></i>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;