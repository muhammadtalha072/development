import React, { useState, useEffect } from 'react';

// ProductCard - A functional component demonstrating React fundamentals
const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isInStock, setIsInStock] = useState(true);

  // useEffect example - simulating stock check
  useEffect(() => {
    // Simulate an API call to check stock status
    const checkStock = () => {
      // Random stock status for demo purposes
      setIsInStock(Math.random() > 0.3);
    };

    checkStock();
    
    // Optional cleanup (not needed for this simple example)
    return () => {
      console.log('ProductCard cleanup');
    };
  }, [product.id]); // Dependency array - runs when product.id changes

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (isInStock) {
      onAddToCart(product, quantity);
      setQuantity(1); // Reset quantity after adding
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto border border-gray-200">
      {/* Product Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
          }}
        />
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-green-600">${product.price}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isInStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isInStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-3 mb-4">
          <label htmlFor={`quantity-${product.id}`} className="text-sm font-medium text-gray-700">
            Quantity:
          </label>
          <select 
            id={`quantity-${product.id}`}
            value={quantity} 
            onChange={handleQuantityChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            disabled={!isInStock}
          >
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={!isInStock}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isInStock 
              ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

// Main App component demonstrating component usage
const App = () => {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop"
    }
  ]);

  // Function to handle adding items to cart
  const handleAddToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          React ProductCard Demo
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Demonstrating Functional Components, useState, and useEffect
        </p>

        {/* Cart Summary */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
          <p className="text-gray-600">Items: {totalItems}</p>
          <p className="text-gray-600">Total: ${totalPrice.toFixed(2)}</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Learning Notes */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-blue-800 mb-4">React Concepts Demonstrated:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">Functional Components</h3>
              <p className="text-blue-600">ProductCard is a functional component that receives props and returns JSX</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">Component Export/Import</h3>
              <p className="text-blue-600">ProductCard is defined and used in the main App component</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">useState Hook</h3>
              <p className="text-blue-600">Managing quantity, stock status, and cart state</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">useEffect Hook</h3>
              <p className="text-blue-600">Simulating API calls for stock checking with dependency array</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;