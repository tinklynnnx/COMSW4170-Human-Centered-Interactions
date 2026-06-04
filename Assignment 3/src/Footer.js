import './App.css';
import ProductListing from "./ProductListing";
function Footer() {
    return (
        <footer className="footer">
            <div className="row">
                <div className="col d-flex">
                    <h4>INFORMATION</h4>
                    <a href="#about">About Us</a>
                    <a href="#contact">Contact Us</a>
                    <a href="#terms">Terms & Conditions</a>
                    <a href="#shipping">Shipping Guide</a>
                </div>
                <div className="col d-flex">
                    <h4>USEFUL LINKS</h4>
                    <a href="#store">Online Store</a>
                    <a href="#service">Customer Service</a>
                    <a href="#promo">Promotion</a>
                    <a href="#brands">Top Brands</a>
                </div>
                <div className="col d-flex">
                    <span><i className='bx bxl-facebook-square'></i></span>
                    <span><i className='bx bxl-instagram-alt'></i></span>
                    <span><i className='bx bxl-github'></i></span>
                    <span><i className='bx bxl-twitter'></i></span>
                    <span><i className='bx bxl-pinterest'></i></span>
                </div>
            </div>
        </footer>
    );
}
export default Footer;