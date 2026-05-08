import useProducts from "../../hooks/useProducts";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";
import { useSelector } from "react-redux";

/**
 * ProductList Component - Displays grid of products with search filtering
 * Features: Product grid, search filtering, loading state, error handling
 */
function ProductList() {
  const { products, loading, error } = useProducts();
  const searchQuery = useSelector((state) => state.search.query);

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Loading State
  if (loading) {
    return (
      <div className="products-grid">
        <div className="loading-state" role="status" aria-live="polite">
          <h2>Loading fresh products...</h2>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="products-grid">
        <div className="error-state" role="alert">
          <h2>❌ Oops! Something went wrong</h2>
          <p>{error || "Unable to load products. Please try again later."}</p>
        </div>
      </div>
    );
  }

  // No Products State
  if (products.length === 0) {
    return (
      <div className="products-grid">
        <div className="no-products-state">
          <h2>📦 No products available</h2>
          <p>Check back soon for new items!</p>
        </div>
      </div>
    );
  }

  // No Search Results State
  if (filteredProducts.length === 0) {
    return (
      <div className="products-grid">
        <div className="no-products-state">
          <h2>🔍 No products found for "{searchQuery}"</h2>
          <p>Try searching for something else or browse all products</p>
        </div>
      </div>
    );
  }

  // Products Grid
  return (
    <div className="products-grid">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
