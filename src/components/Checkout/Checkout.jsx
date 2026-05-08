import "./Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearCart } from "../../redux/cartSlice";
import Header from "../Header/Header";

/**
 * Checkout Component - Order placement page
 * Features: Form with validation, order summary, total calculation, checkout logic
 */
function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalPriceINR = totalPrice.toLocaleString("en-IN");
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    return newErrors;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle order submission
  const handleOrder = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert(
        `✅ Order placed successfully!\n\nThank you, ${formData.fullName}!\nOrder confirmation has been sent to ${formData.email}`,
      );
      dispatch(clearCart());
      navigate("/");
    }, 1000);
  };

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <>
        <Header />
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            minHeight: "70vh",
          }}
        >
          <h1>Your cart is empty</h1>
          <p style={{ marginBottom: "20px" }}>Add items to checkout</p>
          <Link
            to="/"
            style={{
              display: "inline-block",
              background: "var(--primary)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="checkout-container">
        {/* Checkout Form */}
        <form className="checkout-form" onSubmit={handleOrder} noValidate>
          <h1>Checkout</h1>

          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              aria-label="Full Name"
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && (
              <p
                style={{
                  color: "var(--danger)",
                  fontSize: "0.85rem",
                  marginTop: "4px",
                }}
              >
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              aria-label="Email"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p
                style={{
                  color: "var(--danger)",
                  fontSize: "0.85rem",
                  marginTop: "4px",
                }}
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              aria-label="Address"
              aria-invalid={!!errors.address}
            />
            {errors.address && (
              <p
                style={{
                  color: "var(--danger)",
                  fontSize: "0.85rem",
                  marginTop: "4px",
                }}
              >
                {errors.address}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone (10 digits)"
              value={formData.phone}
              onChange={handleInputChange}
              aria-label="Phone Number"
              aria-invalid={!!errors.phone}
              maxLength="10"
            />
            {errors.phone && (
              <p
                style={{
                  color: "var(--danger)",
                  fontSize: "0.85rem",
                  marginTop: "4px",
                }}
              >
                {errors.phone}
              </p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {/* Items List */}
          {items.map((item) => (
            <div key={item.id} className="summary-item">
              <p>{item.title}</p>
              <p>
                {item.quantity}x ₹{item.price.toLocaleString("en-IN")}
              </p>
            </div>
          ))}

          {/* Subtotal */}
          <div className="summary-item">
            <p>
              <strong>Subtotal:</strong>
            </p>
            <p>
              <strong>₹{totalPriceINR}</strong>
            </p>
          </div>

          {/* Delivery Fee */}
          <div className="summary-item">
            <p>
              <strong>Delivery:</strong>
            </p>
            <p>
              <strong>FREE</strong>
            </p>
          </div>

          {/* Total */}
          <h3>
            Total
            <span className="summary-total">₹{totalPriceINR}</span>
          </h3>

          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--gray)",
              marginTop: "12px",
            }}
          >
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
      </div>
    </>
  );
}

export default Checkout;
