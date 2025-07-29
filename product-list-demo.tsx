import React, { useState } from 'react';

const ProductList = () => {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999.99, inStock: true, category: 'Electronics' },
    { id: 2, name: 'Coffee Mug', price: 15.99, inStock: false, category: 'Home' },
    { id: 3, name: 'Wireless Headphones', price: 199.99, inStock: true, category: 'Electronics' },
    { id: 4, name: 'Notebook', price: 5.99, inStock: true, category: 'Office' },
    { id: 5, name: 'Desk Lamp', price: 45.99, inStock: false, category: 'Home' }
  ]);

  const [showOutOfStock, setShowOutOfStock] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter products based on category and stock status
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const stockMatch = showOutOfStock || product.inStock;
    return categoryMatch && stockMatch;
  });

  const categories = ['All', ...new Set(products.map(product => product.category))];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Product List Demo</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category:
            </label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showOutOfStock"
              checked={showOutOfStock}
              onChange={(e) => setShowOutOfStock(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showOutOfStock" className="text-sm font-medium text-gray-700">
              Show out of stock items
            </label>
          </div>
        </div>
      </div>

      {/* Conditional rendering: Show message if no products match filters */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Using map() to render list of products */}
          {filteredProducts.map(product => (
            <div 
              key={product.id} // Important: unique key for each list item
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                product.inStock ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                {/* Conditional rendering with ternary operator */}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                Category: {product.category}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price}
                </span>
                
                {/* Conditional rendering with if statement (using && operator) */}
                {product.inStock && (
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                    Add to Cart
                  </button>
                )}
              </div>
              
              {/* Another conditional example */}
              {!product.inStock && (
                <p className="text-red-600 text-sm mt-2 italic">
                  Currently unavailable
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Summary section */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
          {selectedCategory !== 'All' && ` in ${selectedCategory} category`}
        </p>
        <p className="text-gray-600">
          {/* Using ternary operator for conditional text */}
          {filteredProducts.filter(p => p.inStock).length > 0 
            ? `${filteredProducts.filter(p => p.inStock).length} items available`
            : 'No items currently in stock'
          }
        </p>
      </div>

      {/* Code examples section */}
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Key Concepts Demonstrated:</h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• <strong>map():</strong> Used to render each product in the array</li>
          <li>• <strong>Keys:</strong> Each product has a unique key (product.id)</li>
          <li>• <strong>Ternary operators:</strong> For conditional styling and text</li>
          <li>• <strong>Logical && operator:</strong> For conditional rendering of elements</li>
          <li>• <strong>Array filtering:</strong> To show/hide products based on conditions</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductList;