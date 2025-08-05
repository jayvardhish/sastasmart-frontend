import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, ShoppingCart, Heart, Star, Filter, Bell, User, Menu, X, TrendingUp, 
  Zap, Gift, Tag, Clock, Eye, Share2, Download, Bot, MessageCircle, ThumbsUp, 
  Bookmark, RefreshCw, Grid, List, SortAsc, ChevronDown, ChevronRight, Home, 
  Smartphone, Laptop, Shirt, Book, Gamepad2, Camera, Headphones, Watch, Car, 
  Utensils, Settings, BarChart3, MapPin, Shield, CreditCard, Truck, Award, 
  Calendar, Users, Globe, Wifi, BatteryCharging, Thermometer, Volume2, 
  Mic, CameraOff, Video, Phone, Mail, Location, ExternalLink, Copy, Check
} from 'lucide-react';

// Enhanced Product Data Structure
const EnhancedSastaSmart = () => {
  // Enhanced State Management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());
  const [cartItems, setCartItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dealAlerts, setDealAlerts] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [earnings, setEarnings] = useState({ clicks: 0, revenue: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [comparisonItems, setComparisonItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    notifications: true,
    darkMode: false,
    autoRefresh: true,
    currency: 'INR'
  });

  // Refs
  const chatRef = useRef(null);
  const searchRef = useRef(null);

  // Enhanced Categories with subcategories
  const categories = [
    { id: 'all', name: 'All Products', icon: Home, count: 0 },
    { id: 'electronics', name: 'Electronics', icon: Smartphone, subcategories: ['Mobiles', 'Laptops', 'Tablets', 'Accessories'] },
    { id: 'computers', name: 'Computers', icon: Laptop, subcategories: ['Desktops', 'Laptops', 'Components', 'Peripherals'] },
    { id: 'fashion', name: 'Fashion', icon: Shirt, subcategories: ['Men', 'Women', 'Kids', 'Footwear'] },
    { id: 'books', name: 'Books', icon: Book, subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Comics'] },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, subcategories: ['Consoles', 'Games', 'Accessories', 'PC Gaming'] },
    { id: 'photography', name: 'Photography', icon: Camera, subcategories: ['Cameras', 'Lenses', 'Accessories', 'Drones'] },
    { id: 'audio', name: 'Audio', icon: Headphones, subcategories: ['Headphones', 'Speakers', 'Soundbars', 'Earbuds'] },
    { id: 'watches', name: 'Watches', icon: Watch, subcategories: ['Smart Watches', 'Analog', 'Digital', 'Luxury'] },
    { id: 'automotive', name: 'Automotive', icon: Car, subcategories: ['Car Accessories', 'Bike Accessories', 'Tools', 'Parts'] },
    { id: 'home', name: 'Home & Kitchen', icon: Utensils, subcategories: ['Appliances', 'Cookware', 'Furniture', 'Decor'] }
  ];

  // Enhanced Product Data with new features
  const enhancedProducts = [
    {
      id: 1,
      title: "Samsung Galaxy S24 Ultra 5G",
      price: 89999,
      originalPrice: 124999,
      discount: 28,
      rating: 4.5,
      reviews: 1250,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop",
      category: "electronics",
      subcategory: "Mobiles",
      brand: "Samsung",
      affiliate: {
        amazon: "https://amazon.in/dp/B123456789?tag=sastasmart-21",
        flipkart: "https://flipkart.com/samsung-galaxy-s24?affid=sastasmart"
      },
      features: ["256GB Storage", "12GB RAM", "200MP Camera", "5000mAh Battery", "5G Ready"],
      specifications: {
        display: "6.8 inch Dynamic AMOLED",
        processor: "Snapdragon 8 Gen 3",
        camera: "200MP + 12MP + 10MP + 10MP",
        battery: "5000mAh with 45W fast charging"
      },
      availability: "In Stock",
      delivery: "Free Delivery",
      trending: true,
      flash_deal: true,
      price_history: [129999, 119999, 109999, 99999, 89999],
      stock: 45,
      views: 1250,
      wishlist_count: 89,
      comparison_count: 34
    }
  ];

  // Enhanced State Management Functions
  const showToastMessage = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleAffiliateClick = async (product, platform) => {
    try {
      setLoading(true);
      
      // Track click analytics
      setEarnings(prev => ({
        clicks: prev.clicks + 1,
        revenue: prev.revenue + (product.price * 0.05)
      }));

      // Add to recently viewed
      setRecentlyViewed(prev => [product, ...prev.filter(p => p.id !== product.id)].slice(0, 10));

      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Open affiliate link
      window.open(product.affiliate[platform], '_blank', 'noopener,noreferrer');
      
      showToastMessage(`Opening ${platform} deal...`, 'info');
    } catch (error) {
      showToastMessage('Error opening deal link', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
      showToastMessage('Removed from favorites', 'info');
    } else {
      newFavorites.add(productId);
      showToastMessage('Added to favorites', 'success');
    }
    setFavorites(newFavorites);
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    showToastMessage('Added to cart', 'success');
  };

  const addToWishlist = (product) => {
    const existingItem = wishlist.find(item => item.id === product.id);
    if (!existingItem) {
      setWishlist([...wishlist, product]);
      showToastMessage('Added to wishlist', 'success');
    }
  };

  const addToComparison = (product) => {
    if (comparisonItems.length < 3) {
      const existingItem = comparisonItems.find(item => item.id === product.id);
      if (!existingItem) {
        setComparisonItems([...comparisonItems, product]);
        showToastMessage('Added to comparison', 'success');
      }
    } else {
      showToastMessage('Maximum 3 items for comparison', 'warning');
    }
  };

  const setPriceAlert = (product, targetPrice) => {
    const alert = {
      id: Date.now(),
      productId: product.id,
      productName: product.title,
      targetPrice,
      currentPrice: product.price,
      createdAt: new Date().toISOString()
    };
    setPriceAlerts([...priceAlerts, alert]);
    showToastMessage('Price alert set', 'success');
  };

  const shareProduct = async (product) => {
    const shareData = {
      title: product.title,
      text: `Check out this amazing deal on ${product.title} - only ₹${product.price}!`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for desktop
        navigator.clipboard.writeText(`${product.title} - ₹${product.price} - ${window.location.href}`);
        showToastMessage('Link copied to clipboard', 'success');
      }
    } catch (error) {
      showToastMessage('Error sharing product', 'error');
    }
  };

  // Enhanced Product Card Component
  const EnhancedProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);

    return (
      <div 
        className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'border-gray-200'
        } border overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image with Badges */}
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {product.flash_deal && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                <Zap className="w-3 h-3 inline mr-1" />
                FLASH
              </span>
            )}
            {product.trending && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                HOT
              </span>
            )}
            {product.discount > 20 && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col space-y-1">
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`p-2 rounded-full transition-colors ${
                favorites.has(product.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => addToWishlist(product)}
              className="p-2 bg-white/80 rounded-full hover:bg-yellow-500 hover:text-white transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions on Hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center space-x-2">
              <button
                onClick={() => addToCart(product)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToComparison(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
              >
                Compare
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.title}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
            <span className="text-gray-500 text-xs ml-2">({product.reviews})</span>
          </div>

          <div className="mb-3">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
              <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
            </div>
            <div className="text-sm text-red-600 font-semibold">{product.discount}% OFF</div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleAffiliateClick(product, 'amazon')}
              disabled={loading}
              className="flex-1 bg-orange-500 text-white py-2 px-3 rounded text-sm font-semibold hover:bg-orange-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Loading...' : 'Amazon'}
            </button>
            <button
              onClick={() => handleAffiliateClick(product, 'flipkart')}
              disabled={loading}
              className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm font-semibold hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Loading...' : 'Flipkart'}
            </button>
          </div>

          <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {product.views} views
            </span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              2h ago
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Features Implementation
  const EnhancedFeatures = () => {
    const features = [
      { icon: BarChart3, title: 'Price Tracking', description: 'Track price changes over time' },
      { icon: Bell, title: 'Price Alerts', description: 'Get notified when prices drop' },
      { icon: Shield, title: 'Authenticity Check', description: 'Verify product authenticity' },
      { icon: CreditCard, title: 'Cashback Offers', description: 'Earn cashback on purchases' },
      { icon: Truck, title: 'Delivery Tracking', description: 'Track your orders in real-time' },
      { icon: Award, title: 'Loyalty Rewards', description: 'Earn points for every purchase' }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <feature.icon className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    );
  };

  // Toast Notification Component
  const ToastNotification = () => {
    if (!toast.show) return null;

    const bgColor = toast.type === 'success' ? 'bg-green-500' : 
                     toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500';

    return (
      <div className={`fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down`}>
        {toast.message}
      </div>
    );
  };

  // Main Component
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Enhanced Header */}
      <header className={`sticky top-0 z-50 transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg mr-3">
                <Gift className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SastaSmart Enhanced
              </h1>
              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded">LIVE</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search products, brands, deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? '🌞' : '🌙'}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  {dealAlerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {dealAlerts.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <ToastNotification />
      
      <div className="container mx-auto px-4 py-6">
        <EnhancedFeatures />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`p-4 rounded-lg border transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className="font-semibold mb-4">Filters</h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left p-2 rounded-lg transition-colors flex items-center ${
                          selectedCategory === category.id
                            ? 'bg-blue-500 text-white'
                            : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        <span className="text-sm">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Products</h2>
                <p className="text-gray-600 dark:text-gray-400">{filteredProducts.length} products found</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Best Discount</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enhancedProducts.map(product => (
                <EnhancedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 space-y-3">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => shareProduct({ title: 'SastaSmart', price: 0 })}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border flex flex-col z-50">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              <span className="font-semibold">SastaSmart AI</span>
            </div>
            <button onClick={() => setChatOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div ref={chatRef} className="flex-1 p-4 overflow-y-auto">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mb-3">
              <p className="text-sm">Hi! I'm your AI assistant. How can I help you find the best deals?</p>
            </div>
          </div>
          
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSastaSmart;
