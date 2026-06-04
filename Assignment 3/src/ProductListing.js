import './App.css';
import ProductItem from './ProductItem';

function ProductListing({ products = [] }) {
    return (
        <section className="section new-arrival">
            <div className="title">
                <h1>OUR SELECTION</h1>
                <p>We offer a wide variety of the latest trends!</p>
            </div>

            <div className="product-center">
                {products.map((productItem) => (
                    <ProductItem
                        key={productItem.id}
                        id={productItem.id}
                        name={productItem.name}
                        category={productItem.category}
                        imageUrl={productItem.thumbnail_image}
                        price={productItem.price}
                        discount={productItem.discount}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProductListing;