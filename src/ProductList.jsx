import React, { useEffect, useState } from 'react';

export default function ProductList({ search, setIsLoading, setError }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      setIsLoading(true); // Start loading
      const resp = await fetch(`https://dummyjson.com/products/search?q=${search}&limit=10&skip=${(currentPage - 1) * 10}`);
      
      if (!resp.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const result = await resp.json();
      setData(result.products);
      setTotalPages(Math.ceil(result.total / 10)); // Assuming the API returns the total number of products
      setIsLoading(false); // Stop loading
    } catch (err) {
      setError(err.message); // Set error message
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (search) {
      fetchData();
    }
  }, [search, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <>
      {data.map((el, index) => (
        <div key={index} className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{el.title}</h2>
          <p className="text-gray-600">{el.category} - ${el.price}</p>
        </div>
      ))}

      <div className="flex justify-between mt-4  space-x-12">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
      <p className="text-center mt-2 text-gray-500">Page {currentPage} of {totalPages}</p>
    </>
  );
}