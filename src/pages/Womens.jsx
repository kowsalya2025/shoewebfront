
import React, { useState } from 'react';
import { Star, Filter, ShoppingCart, Trash2, Lock } from 'lucide-react';

const womensShoes = () => {
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 10000 });
  const [brandFilter, setBrandFilter] = useState('all');
  const [currentView, setCurrentView] = useState('products'); // 'products' or 'cart'

  const products = [
    {
      id: 1,
      name: "Lunar",
      brand: "Whitby",
      price: 2799,
      originalPrice: 2799,
      rating: 4.5,
      reviews: 128,
      colors: ['multi-color'],
      colorOptions: ['#E8D5FF', '#FFB6C1', '#87CEEB'],
      image: "/images/women1.png",
      description: "Comfortable EVA clog with marble pattern"
    },
    {
      id: 2,
      name: "lilley",
      brand: "Walkright",
      price: 3199,
      originalPrice: 3199,
      rating: 4.3,
      reviews: 95,
      colors: ['blue'],
      colorOptions: ['#d8e0e3ff'],
      image: "/images/women2.png",
      description: "Canvas shoes with easy fasten design"
    },
    {
      id: 3,
      name: "Softlites",
      brand: "Walkright",
      price: 2799,
      originalPrice: 3699,
      rating: 4.7,
      reviews: 156,
      colors: ['pink'],
      colorOptions: ['#FFB6C1', '#FF69B4'],
      image: "/images/women3.png",
      description: "Stylish polka dot canvas shoes"
    },
    {
      id: 4,
      name: "Shoezone",
      brand: "Walkright",
      price: 4799,
      originalPrice: 4799,
      rating: 4.6,
      reviews: 203,
      colors: ['multi-color'],
      colorOptions: ['#E8D5FF', '#FFB6C1', '#FFFFFF'],
      image: "/images/women4.png",
      description: "Elegant T-bar sandals for special occasions"
    },

      {
      id: 5,
      name: "Tureffle",
      brand: "Walkright",
      price: 3799,
      originalPrice: 2999,
      rating: 4.5,
      reviews: 201,
      colors: ['multi-color'],
      colorOptions: ['#E8D5FF', '#FFB6C1', '#FFFFFF'],
      image: "/images/women5.png",
      description: "Elegant T-bar sandals for special occasions"
    },

      {
      id: 6,
      name: "Stella flat",
      brand: "Walkright",
      price: 4699,
      originalPrice: 3999,
      rating: 4.1,
      reviews: 189,
      colors: ['multi-color'],
      colorOptions: ['#E8D5FF', '#FFB6C1', '#FFFFFF'],
      image: "/images/women6.png",
      description: "Elegant T-bar sandals for special occasions"
    },

      {
      id: 7,
      name: "Neolle Mesh Bow",
      brand: "Walkright",
      price: 4799,
      originalPrice: 4799,
      rating: 4.6,
      reviews: 203,
      colors: ['multi-color'],
      colorOptions: ['#E8D5FF', '#FFB6C1', '#FFFFFF'],
      image: "/images/women7.png",
      description: "Elegant T-bar sandals for special occasions"
    },

      {
      id: 8,
      name: "Spider-Man",
      brand: "Walkright",
      price: 4799,
      originalPrice: 4799,
      rating: 4.6,
      reviews: 216,
      colors: ['multi-color'],
      colorOptions: ['#E8D5FF', '#FFB6C1', '#FFFFFF'],
      image: "/images/women8.png",
      description: "Elegant T-bar sandals for special occasions"
    }
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);

  const addToCart = (product, selectedColor = null) => {
    const cartItem = {
      ...product,
      selectedColor: selectedColor || product.colorOptions[0],
      selectedSize: '41',
      quantity: 1,
      cartId: `${product.id}-${selectedColor || product.colorOptions[0]}`
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.cartId === cartItem.cartId);
      if (existingItem) {
        return prevCart.map(item =>
          item.cartId === cartItem.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, cartItem];
    });

    // Show success message (you could use toast notification here)
    alert(`${product.name} added to cart!`);
  };

  const buyNow = (product) => {
    addToCart(product);
    setCurrentView('cart');
  };

  const removeFromCart = (cartId) => {
    setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
  };

  const updateCartQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateCartSize = (cartId, newSize) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.cartId === cartId ? { ...item, selectedSize: newSize } : item
      )
    );
  };

  const applyFilters = () => {
    let filtered = products;

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceFilter.min && product.price <= priceFilter.max
    );

    // Brand filter
    if (brandFilter !== 'all') {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase() === brandFilter.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [sortBy, priceFilter, brandFilter]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-200 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const CartPage = () => {
    const [countdown, setCountdown] = useState({ hours: 23, minutes: 53, seconds: 50 });

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else if (prev.hours > 0) {
            return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
          }
          return prev;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart</h1>
          <button
            onClick={() => setCurrentView('products')}
            className="text-2xl font-semibold text-gray-800 mb-6 hover:text-blue-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>

        {/* Delivery Timer */}
        <div className="bg-gray-100 rounded-2xl p-6 mb-8 text-center">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Free & Fast arriving by Monday</span> Order within{' '}
            <span className="font-bold text-red-600">
              {countdown.hours} hours, {countdown.minutes} minutes, {countdown.seconds} seconds
            </span>
          </p>
        </div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">Your cart is empty</p>
            <button
              onClick={() => setCurrentView('products')}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="space-y-6 mb-8">
              {cart.map((item) => (
                <div key={item.cartId} className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full md:w-80 h-64 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-48 h-32 bg-gradient-to-br from-amber-200 to-amber-400 rounded-lg items-center justify-center hidden">
                        <span className="text-amber-800 font-medium">Product Image</span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">Comfy Steps</h3>
                          <p className="text-lg text-gray-600 mb-4">{item.name}</p>
                          <p className="text-xl font-bold text-gray-800">
                            MRP₹ {item.price.toLocaleString()}
                          </p>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <span>Remove</span>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Size and Quantity Selectors */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Size Selector */}
                        <div className="flex-1">
                          <select
                            value={item.selectedSize || '41'}
                            onChange={(e) => updateCartSize(item.cartId, e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="39">Size (39)</option>
                            <option value="40">Size (40)</option>
                            <option value="41">Size (41)</option>
                            <option value="42">Size (42)</option>
                            <option value="43">Size (43)</option>
                          </select>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex-1">
                          <select
                            value={item.quantity}
                            onChange={(e) => updateCartQuantity(item.cartId, parseInt(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>Quantity ({num})</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold">₹ {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span className="font-medium">Delivery</span>
                  <span className="font-semibold">Free</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <button className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                  <span>Delivery & return information</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Checkout Buttons */}
            <div className="space-y-4">
              {/* Secure Checkout */}
              <button
              onClick={() => setCurrentView("checkout")}
               className="w-full bg-yellow-700 text-white py-4 rounded-lg font-bold text-2xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-3">
                <Lock className="w-5 h-5" />
                Checkout Securely
              </button>

              {/* Express Checkout */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Express Checkout</h3>
                
                {/* Google Pay */}
                <button className="w-full bg-white border-2 border-gray-300 py-4 rounded-lg mb-3 hover:border-gray-400 transition-colors flex items-center justify-center">
                  <div className="flex items-center">
                    <span className="text-blue-500 font-bold text-xl mr-1">G</span>
                    <span className="text-red-500 font-bold text-xl mr-1">o</span>
                    <span className="text-yellow-500 font-bold text-xl mr-1">o</span>
                    <span className="text-blue-500 font-bold text-xl mr-1">g</span>
                    <span className="text-green-500 font-bold text-xl mr-1">l</span>
                    <span className="text-red-500 font-bold text-xl mr-3">e</span>
                    <span className="text-gray-600 font-medium text-lg">Pay</span>
                  </div>
                </button>

                {/* PayPal */}
                <button className="w-full bg-white border-2 border-gray-300 py-4 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-2xl">Pay</span>
                  <span className="text-blue-400 font-bold text-2xl">Pal</span>
              
                </button>
                <button className="w-full bg-white border-2 border-gray-300 py-4 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center text-dark">
          
                  <span className="text-blue-400 font-bold text-2xl">Clearpay</span>
                 
                </button>
                <button className="w-full bg-white border-2 border-gray-300 py-4 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center text-dark">
                  <span className="text-blue-400 font-bold text-2xl">Klarna</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // Main render function
  if (currentView === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with back to products */}
        <div className="bg-white shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <button
              onClick={() => setCurrentView('products')}
              className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              ← Womens Slippers
            </button>
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
        <CartPage />
      </div>
    );
  }

// checkout

const CheckoutPage = () => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Summary</h1>
        <button
          onClick={() => setCurrentView("cart")}
          className="text-2xl font-semibold text-gray-800 mb-6 hover:text-blue-600 transition-colors"
        >
          ← Back to Cart
        </button>
      </div>

      {/* Order Items */}
      <div className="space-y-6 mb-8">
        {cart.map((item) => (
          <div key={item.cartId} className="bg-white rounded-lg p-4 shadow-sm border flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-contain"
            />
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="font-bold text-gray-800">
                ₹ {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between text-xl font-bold">
          <span>Total Payable</span>
          <span>₹ {total.toLocaleString()}</span>
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={() => alert("Order placed successfully! 🎉")}
        className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-green-700 transition-colors"
      >
        Place Order
      </button>
    </div>
  );
};



  if (currentView === "cart") {
    return (
      <div className="min-h-screen bg-gray-50">
        <CartPage />
      </div>
    );
  }

  if (currentView === "checkout") {
    return (
      <div className="min-h-screen bg-gray-50">
        <CheckoutPage />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with cart */}
      <div className="bg-white shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">Womens Slippers</h1>
          <button
            onClick={() => setCurrentView('cart')}
            className="relative hover:scale-105 transition-transform"
          >
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Filters and Sort Bar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters →
            </button>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceFilter.min}
                    onChange={(e) => setPriceFilter({...priceFilter, min: Number(e.target.value)})}
                    className="w-20 p-2 border rounded"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceFilter.max}
                    onChange={(e) => setPriceFilter({...priceFilter, max: Number(e.target.value)})}
                    className="w-20 p-2 border rounded"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Brand</h3>
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="all">All Brands</option>
                  <option value="walkright">Walkright</option>
                  <option value="whitby">Whitby</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              {/* Product Image */}
              <div className="bg-gray-100 p-6 h-64 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-48 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg items-center justify-center hidden">
                  <span className="text-gray-500 text-sm">Image not found</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-sm text-gray-600">MRP₹ </span>
                  <span className="text-xl font-bold text-gray-800">
                    {product.price.toLocaleString()}
                  </span>
                </div>

                {/* Color Options */}
                <div className="mb-4">
                  <span className="text-sm text-gray-600 block mb-2">
                    {product.colors.includes('multi-color') ? 'Multi Color' : `Color`}
                  </span>
                  <div className="flex gap-2">
                    {product.colorOptions.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => buyNow(product)}
                    className="flex-1 bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No products found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Cart Summary (when items exist) */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
          <h3 className="font-semibold mb-2">Cart Summary</h3>
          <p className="text-sm text-gray-600">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} items • ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
          </p>
          <button 
            onClick={() => setCurrentView('cart')}
            className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default womensShoes;