import React, { useState, useEffect } from 'react';
import Header from '../../components/Popular_Categories/Header';
import Filters from '../../components/Popular_Categories/Filters';
import ProductGrid from '../../components/Popular_Categories/ProductGrid';

function StorageBaskets() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    let result = products;
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    if (priceFilter) {
      result = result.filter(product => product.price <= parseInt(priceFilter));
    }
    if (ratingFilter) {
      result = result.filter(product => Math.round(product.rating.rate) >= ratingFilter);
    }
    setFilteredProducts(result);
  }, [products, categoryFilter, priceFilter, ratingFilter]);

  return (
    <div className="bg-[#fff5edff] min-h-screen">
      <Header 
        backgroundUrl="https://th.bing.com/th/id/OIP.i6z_n4Uisa3gC4yRarmtIgHaCJ?w=1920&h=556&rs=1&pid=ImgDetMain" 
        headingText="Storage Baskets Products"
        paragraphText="Home/Storage Baskets Products"
      />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          <Filters 
            setCategoryFilter={setCategoryFilter}
            setPriceFilter={setPriceFilter}
            setRatingFilter={setRatingFilter}
            backgroundColor="#ffd294ff" 
          />
          <ProductGrid products={filteredProducts} />
        </div>
      </main>
    </div>
  );
}

export default StorageBaskets
