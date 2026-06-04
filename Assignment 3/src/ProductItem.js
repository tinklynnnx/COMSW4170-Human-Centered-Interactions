import { Link } from 'react-router-dom';

function ProductItem({ name, category, imageUrl, price, discount, id }) {
    return (
        <div className="product-item">
            <Link to={`/product/${id}`} className="product-thumb">
                <div className="overlay">
                    <img src={require(`./${imageUrl}`)} alt={name} />
                </div>
                {discount > 0 && <span className="discount">{discount}%</span>}
            </Link>
            <div className="product-info">
                <span className="category">{category}</span>
                <Link to={`/product/${id}`}>{name}</Link>
                <h4>${price}</h4>
            </div>
        </div>
    );
}

export default ProductItem;