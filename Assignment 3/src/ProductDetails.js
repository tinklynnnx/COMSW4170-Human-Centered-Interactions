import './App.css';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

function ProductDetails({ productsData, handleAddToCart }) {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);

    const product = productsData.find(p => p.id === parseInt(productId));

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddClick = () => {
        handleAddToCart(product, quantity);
        setQuantity(1); // Reset quantity after adding
    };

    return (
        <section className="section product-detail">
            <div className="details container">
                <div className="left image-container">
                    <div className="main">
                        <img src={require(`./${product.image}`)} id="zoom" alt={product.name} />
                    </div>
                </div>
                <div className="right" style={{ textAlign: 'left' }}>
          <span>
            <Link to="/">Home</Link> / <span className="category">{product.category}</span>
          </span>
                    <h1>{product.name}</h1>
                    <div className="price">${product.price}</div>
                    <form className="form">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                            style={{
                                appearance: 'textfield',
                                MozAppearance: 'textfield',
                                WebkitAppearance: 'none',
                                boxShadow: 'none',
                                borderRadius: '6px',
                                border: '1px solid #ccc'
                            }}
                        />
                        <Link
                            to="/cart"
                            className="addCart"
                            onClick={handleAddClick}
                        >
                            Add To Cart
                        </Link>
                    </form>
                    <h3>Product Details</h3>
                    <p>{product.description}</p>
                </div>
            </div>
        </section>
    );
}



export default ProductDetails;