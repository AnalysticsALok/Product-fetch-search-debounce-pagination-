import { useState, useEffect } from 'react';
import './index.css';
import ProductList from './productList';

function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Debounce the search input
  useEffect(() => {
    if (search) {
      const handler = setTimeout(() => {
        setDebouncedSearch(search);
        setIsLoading(true); // Set loading true when debounce is triggered with non-empty search
      }, 500); // Delay of 500ms

      return () => {
        clearTimeout(handler);
      };
    } else {
      setDebouncedSearch(''); // Clear the debounced search if input is empty
      setIsLoading(false); // Do not show loading if search input is empty
    }
  }, [search]);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Product Search</h1>
      <input 
        type="text" 
        placeholder="Search products..."
        value={search} 
        onChange={(e) => {
          setSearch(e.target.value);
          setError(null); // Reset error on new search
        }} 
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w-md"
      />

      {/* Loading indicator */}
      {isLoading && <p className="text-blue-500">Loading...</p>}
      
      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Pass loading and error state to ProductList */}
      <ProductList 
        search={debouncedSearch} 
        setIsLoading={setIsLoading} 
        setError={setError} 
      />
    </div>
  );
}

export default App;