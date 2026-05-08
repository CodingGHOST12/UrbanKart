import "./Cart.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import Header from "../Header/Header";

/**
 * Cart Component - Shopping cart with item management
 * Features: Item display, total calculation, empty state, checkout link
 */
function Cart() {
  const items = useSelector((state) => state.cart.items);

  // Calculate total price
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // Format total price directly in INR
  const totalPriceINR = totalPrice.toLocaleString("en-IN");

  // Calculate item count
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Empty Cart State
  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="empty-cart">
          <h1>🛒 Your Cart is Empty</h1>
          <p>Add some delicious products to get started!</p>
          <Link to="/">Continue Shopping</Link>
        </div>
      </>
    );
  }

  // Cart with Items
  return (
    <>
      <Header />
      <div className="cart-container">
        <h1>Shopping Cart ({itemCount} items)</h1>

        <div className="cart-items">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <div>
            <h2>₹{totalPriceINR}</h2>
            <p style={{ margin: 0, color: "var(--gray)", fontSize: "0.9rem" }}>
              Total for {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <Link to="/checkout">Proceed To Checkout</Link>
        </div>
      </div>
    </>
  );
}

export default Cart;
