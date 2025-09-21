import React, { useState, useMemo, useEffect } from 'react'
import './App.css'
import useDebounce from './hooks/useDebounce.jsx'
import { useGetProductsQuery } from './features/api/apiSlice.jsx'
import SearchBar from './components/SearchBar.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import AddProductForm from './components/AddProductForm.jsx'
import ProductList from './components/ProductList.jsx'
import TopProducts from './components/TopProducts.jsx'
import CategoryChart from './components/CategoryChart.jsx'
import Pagination from './components/Pagination.jsx'
import Header from './components/Header.jsx';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, category]);


  const { data: response, isLoading, isError, isFetching } = useGetProductsQuery(
      { search: debouncedSearchTerm, category, page }
  );
  
  const products = response?.products || [];
  const currentPage = response?.currentPage || 1;
  const totalPages = response?.totalPages || 1;
  
  const allCategories = useMemo(() => 
      products ? [...new Set(products.map(p => p.category))] : [], 
      [products]
  );

  return (
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
          
          <Header />

          
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <CategoryFilter selectedCategory={category} setSelectedCategory={setCategory} categories={allCategories} />
              </div>
              
              <AddProductForm categories={allCategories} />
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
                 
                  <div className="lg:col-span-3 order-2 lg:order-1">
                       <ProductList products={products} isLoading={isLoading || isFetching} error={isError} categories={allCategories} />
                       <Pagination 
                           currentPage={currentPage} 
                           totalPages={totalPages} 
                           onPageChange={setPage} 
                       />
                  </div>
                  
                
                  <aside className="space-y-4 lg:space-y-8 order-1 lg:order-2">
                      <TopProducts />
                      <CategoryChart />
                  </aside>
              </div>
          </main>
      </div>
  );
};

export default App
