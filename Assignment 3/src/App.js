import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import ProductListing from './ProductListing';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import CartItem from './CartItem';
import Footer from './Footer';
import productsData from './products.json';

function App() {
    const [shoppingCart, setShoppingCart] = useState([]);

    function handleAddToCart(item, quantity) {
        const qty = parseInt(quantity);
        if (qty <= 0) return;

        let newShoppingCart = [...shoppingCart];
        const existingItemIndex = newShoppingCart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            newShoppingCart[existingItemIndex].quantity += qty;
        } else {
            newShoppingCart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                thumbnail_image: item.thumbnail_image,
                quantity: qty
            });
        }

        setShoppingCart(newShoppingCart);
    }

    function handleRemoveFromCart(item, removeAll = false, quantity = 1) {
        let newShoppingCart = [...shoppingCart];
        const existingItemIndex = newShoppingCart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex === -1) return;

        if (removeAll) {
            newShoppingCart.splice(existingItemIndex, 1);
        } else {
            newShoppingCart[existingItemIndex].quantity -= quantity;

            if (newShoppingCart[existingItemIndex].quantity <= 0) {
                newShoppingCart.splice(existingItemIndex, 1);
            }
        }

        setShoppingCart(newShoppingCart);
    }

    const totalCartItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);

    return (
        <Router>
            <div className="App">
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
                />
                <Header cartItemCount={totalCartItems} />
                <Routes>
                    <Route path="/" element={<ProductListing products={productsData} />} />
                    <Route
                        path="/product/:productId"
                        element={
                            <ProductDetails
                                productsData={productsData}
                                handleAddToCart={handleAddToCart}
                            />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <Cart
                                shoppingCart={shoppingCart}
                                handleAddToCart={handleAddToCart}
                                handleRemoveFromCart={handleRemoveFromCart}
                            />
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
