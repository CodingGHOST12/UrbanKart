import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";

/**
 * App Component - Main home page
 * Features: Header with search, product list with filtering
 */
function App() {
  return (
    <main>
      <Header />
      <ProductList />
    </main>
  );
}

export default App;
