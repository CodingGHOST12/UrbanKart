import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/searchSlice";

/**
 * Header Component - Sticky navigation bar with search and cart
 * Features: Logo, search bar, navigation links, cart counter
 */
function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const searchQuery = useSelector((state) => state.search.query);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="header" role="banner">
      {/* Logo */}
      <Link to="/" className="logo" aria-label="UrbanKart Home">
        UrbanKart
      </Link>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products, brands or categories..."
        className="search-input"
        value={searchQuery}
        onChange={handleSearchChange}
        aria-label="Search products"
        role="searchbox"
      />

      {/* Navigation */}
      <nav role="navigation" aria-label="Main navigation">
        <Link to="/" aria-current="page">
          Home
        </Link>
        <Link to="/cart" aria-label={`Cart with ${cartItems.length} items`}>
          Cart
          {cartItems.length > 0 && (
            <span
              className="cart-badge"
              aria-label={`${cartItems.length} items`}
            >
              {cartItems.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
