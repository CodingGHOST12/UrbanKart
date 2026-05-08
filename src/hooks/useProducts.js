import { useEffect, useState } from "react";

import productsData from "../components/data/products";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(productsData);

      setLoading(false);
    }, 800);
  }, []);

  return {
    products,
    loading,
    error: "",
  };
};

export default useProducts;
