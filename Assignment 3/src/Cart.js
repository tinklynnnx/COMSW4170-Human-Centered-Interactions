import './App.css';
import CartItem from './CartItem';

function Cart({ shoppingCart, handleAddToCart, handleRemoveFromCart }) {
    const calculateTotal = () => {
        return shoppingCart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    return (
        <div className="shopping-cart">
            <div className="title">
                <h1>YOUR CART</h1>
            </div>

            <div className="cart-items-container">
                {shoppingCart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px' }}>
                        <span className="empty-cart">No items in cart.</span>
                    </div>
                ) : (
                    shoppingCart.map((cartItem) => (
                        <CartItem
                            key={cartItem.id}
                            item={cartItem}
                            handleAddToCart={handleAddToCart}
                            handleRemoveFromCart={handleRemoveFromCart}
                        />
                    ))
                )}
            </div>

            {shoppingCart.length > 0 && (
                <>
                    <div className="total-container">
                        <span id="cart-total-label">Total:</span>
                        <span id="cart-total-dollar">$</span>
                        <span id="cart-total-amount">{calculateTotal()}</span>
                    </div>

                    <div className="purchase-btn-container">
                        <a href="#checkout" className="proceed-to-checkout">Proceed to Checkout</a>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;