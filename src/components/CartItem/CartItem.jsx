import "./CartItem.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/cartSlice";

/**
 * CartItem Component - Individual cart item with quantity controls
 * Features: Product display, quantity controls, remove button, price calculation
 * Validation: Quantity never goes below 1
 */
function CartItem({ item }) {
  const dispatch = useDispatch();

  // Handle decrease quantity - won't go below 1
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    }
  };

  // Handle increase quantity
  const handleIncreaseQuantity = () => {
    // Check stock limit
    if (item.quantity < item.stock) {
      dispatch(increaseQuantity(item.id));
    }
  };

  // Calculate item total
  const itemTotal = (item.price * item.quantity).toLocaleString("en-IN");

  return (
    <div className="cart-item" role="article">
      {/* Product Image */}
      <img
        src={item.thumbnail}
        alt={item.title}
        onError={(e) => {
          e.currentTarget.src =
            "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E";
        }}
      />

      {/* Product Info */}
      <div className="cart-info">
        <h3>{item.title}</h3>
        <p>₹{item.price.toLocaleString("en-IN")}</p>

        {/* Quantity Controls */}
        <div
          className="quantity-controls"
          role="group"
          aria-label="Quantity controls"
        >
          <button
            onClick={handleDecreaseQuantity}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
            title="Decrease quantity"
          >
            −
          </button>
          <span aria-live="polite" aria-label={`Quantity: ${item.quantity}`}>
            {item.quantity}
          </span>
          <button
            onClick={handleIncreaseQuantity}
            disabled={item.quantity >= item.stock}
            aria-label="Increase quantity"
            title={
              item.quantity >= item.stock
                ? "Stock limit reached"
                : "Increase quantity"
            }
          >
            +
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="item-total">
        <strong>₹{itemTotal}</strong>
      </div>

      {/* Remove Button */}
      <button
        className="remove-btn"
        onClick={() => dispatch(removeFromCart(item.id))}
        aria-label={`Remove ${item.title} from cart`}
        title="Remove from cart"
      >
        🗑 Remove
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
