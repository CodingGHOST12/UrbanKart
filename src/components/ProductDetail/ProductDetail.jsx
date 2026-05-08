import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import "./ProductDetail.css";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useState } from "react";

/**
 * ProductDetail Component - Single product detailed view
 * Features: Product image, description, specs, reviews, add to cart, stock status
 */
function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  // Find product
  const product = products.find((item) => item.id === Number(id));

  // Handle add to cart
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Product not found
  if (!product) {
    return (
      <>
        <Header />
        <div className="not-found-container">
          <h1>404</h1>
          <h2>Product Not Found</h2>
          <p>
            Sorry, the product you're looking for doesn't exist or has been
            removed.
          </p>
          <Link to="/" className="back-btn">
            ← Back To Products
          </Link>
        </div>
      </>
    );
  }

  const imageUrl = product.images?.[0] || product.thumbnail;
  const isOutOfStock = product.stock === 0;

  return (
    <>
      <Header />
      <div className="detail-container">
        {/* Product Image */}
        <div className="detail-image">
          <img
            src={imageUrl}
            alt={product.title}
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22400%22/%3E%3C/svg%3E";
            }}
          />
        </div>

        {/* Product Details */}
        <div className="detail-content">
          {/* Category */}
          <span className="category">{product.category}</span>

          {/* Title */}
          <h1>{product.title}</h1>

          {/* Description */}
          <p className="description">{product.description}</p>

          {/* Price */}
          <h2 className="price">₹{product.price.toLocaleString("en-IN")}</h2>

          {/* Product Information */}
          <div className="product-info">
            <p>
              <strong>Brand</strong>
              {product.brand}
            </p>
            <p>
              <strong>Rating</strong>⭐ {product.rating} / 5
            </p>
            <p>
              <strong>Stock Status</strong>
              {isOutOfStock ? "Out of Stock" : `${product.stock} Available`}
            </p>
            <p>
              <strong>Category</strong>
              {product.category}
            </p>
          </div>

          {/* Stock Status Alert */}
          {product.stock < 10 && (
            <div className={`stock-status ${isOutOfStock ? "out" : "low"}`}>
              {isOutOfStock ? (
                <span>🔴 Out of Stock</span>
              ) : (
                <span>⚠️ Only {product.stock} items left</span>
              )}
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="button-group">
            <button
              className="add-cart-btn"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {addedToCart ? "✓ Added to Cart" : "Add To Cart"}
            </button>
          </div>

          {/* Back Button */}
          <Link to="/" className="back-btn">
            ← Back To Products
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
