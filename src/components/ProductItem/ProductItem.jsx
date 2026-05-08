import "./ProductItem.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

/**
 * ProductItem Component - Individual product card
 * Displays: product image, title, price, rating, stock status, action buttons
 */
function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const imageUrl = product.images?.[0] || product.thumbnail;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="product-card" role="article">
      {/* Stock Badge */}
      {product.stock < 10 && (
        <div className={`stock-badge ${isOutOfStock ? "out" : "low"}`}>
          {isOutOfStock ? "Out" : `${product.stock} left`}
        </div>
      )}

      {/* Rating Badge */}
      <div className="rating-badge">
        <span>⭐</span>
        {product.rating}
      </div>

      {/* Product Image */}
      <img
        src={imageUrl}
        alt={product.title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src =
            "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22160%22 height=%22160%22/%3E%3C/svg%3E";
        }}
      />

      <div className="product-labels">
        <span className="product-category">{product.category}</span>
        <span className="product-brand">{product.brand}</span>
      </div>

      {/* Product Info */}
      <h3>{product.title}</h3>
      <p>₹{product.price.toLocaleString("en-IN")}</p>

      {/* Action Buttons */}
      <div className="btns">
        <Link
          to={`/product/${product.id}`}
          aria-label={`View details for ${product.title}`}
        >
          Details
        </Link>
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          aria-label={`Add ${product.title} to cart`}
        >
          {isOutOfStock ? "Out of Stock" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProductItem;
