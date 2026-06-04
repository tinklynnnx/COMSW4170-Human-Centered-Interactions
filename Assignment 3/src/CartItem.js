import './App.css';

function CartItem({ item, handleAddToCart, handleRemoveFromCart }) {
    return (
        <div className="cart-item">
            <div className="delete-btn-container">
        <span
            className="delete-btn"
            onClick={() => handleRemoveFromCart(item, true)}
            style={{ cursor: 'pointer' }}
        ></span>
            </div>

            <div className="image">
                <img src={require(`./${item.thumbnail_image}`)} alt={item.name} />
            </div>

            <div className="description">
                <span>{item.name}</span>
            </div>

            <div className="quantity">
                <button
                    className="minus-btn"
                    type="button"
                    onClick={() => handleRemoveFromCart(item, false, 1)}
                >
                    -
                </button>
                <input type="text" value={item.quantity} readOnly />
                <button
                    className="plus-btn"
                    type="button"
                    onClick={() => handleAddToCart(item, 1)}
                >
                    +
                </button>
            </div>

            <div className="cart-item-price">
                ${item.price * item.quantity}
            </div>
        </div>
    );
}

export default CartItem;