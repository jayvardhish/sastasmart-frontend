import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Heart, Star, Filter, Bell, User, Menu, X, TrendingUp, Zap, Gift, Tag, Clock, Eye, Share2, Download, Bot, MessageCircle, ThumbsUp, Bookmark, RefreshCw, Grid, List, SortAsc, ChevronDown, ChevronRight, Home, Smartphone, Laptop, Shirt, Book, Gamepad2, Camera, Headphones, Watch, Car, Utensils } from 'lucide-react';

const SastaSmart = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dealAlerts, setDealAlerts] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [earnings, setEarnings] = useState({ clicks: 0, revenue: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const chatRef = useRef(null);

  // Categories with icons
  const categories = [
    { id: 'all', name: 'All Products', icon: Home },
    { id: 'electronics', name: 'Electronics', icon: Smartphone },
    { id: 'computers', name: 'Computers', icon: Laptop },
    { id: 'fashion', name: 'Fashion', icon: Shirt },
    { id: 'books', name: 'Books', icon: Book },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 },
    { id: 'photography', name: 'Photography', icon: Camera },
    { id: 'audio', name: 'Audio', icon: Headphones },
    { id: 'watches', name: 'Watches', icon: Watch },
    { id: 'automotive', name: 'Automotive', icon: Car },
    { id: 'home', name: 'Home & Kitchen', icon: Utensils }
  ];

  // Sample products data (in real app, this would come from Firebase/API)
  const sampleProducts = [
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
      brand: "Samsung",
      affiliate_amazon: "https://amazon.in/dp/B123456789?tag=sastasmart-21",
      affiliate_flipkart: "https://flipkart.com/samsung-galaxy-s24?affid=sastasmart",
      features: ["256GB Storage", "12GB RAM", "200MP Camera", "5000mAh Battery"],
      availability: "In Stock",
      delivery: "Free Delivery",
      trending: true,
      flash_deal: true
    },
    {
      id: 2,
      title: "Apple MacBook Air M2",
      price: 99900,
      originalPrice: 119900,
      discount: 17,
      rating: 4.8,
      reviews: 890,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      category: "computers",
      brand: "Apple",
      affiliate_amazon: "https://amazon.in/dp/B987654321?tag=sastasmart-21",
      affiliate_flipkart: "https://flipkart.com/apple-macbook-air-m2?affid=sastasmart",
      features: ["M2 Chip", "8GB RAM", "256GB SSD", "13.6 Display"],
      availability: "Limited Stock",
      delivery: "Free Delivery",
      trending: true
    },
    {
      id: 3,
      title: "Nike Air Force 1 '07",
      price: 7495,
      originalPrice: 8995,
      discount: 17,
      rating: 4.3,
      reviews: 2100,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      category: "fashion",
      brand: "Nike",
      affiliate_amazon: "https://amazon.in/dp/B456789123?tag=sastasmart-21",
      affiliate_flipkart: "https://flipkart.com/nike-air-force-1?affid=sastasmart",
      features: ["Leather Upper", "Air Sole Unit", "Rubber Outsole", "Classic Design"],
      availability: "In Stock",
      delivery: "Free Delivery",
      flash_deal: true
    },
    {
      id: 4,
      title: "Sony WH-1000XM5 Headphones",
      price: 24990,
      originalPrice: 29990,
      discount: 17,
      rating: 4.6,
      reviews: 1580,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop",
      category: "audio",
      brand: "Sony",
      affiliate_amazon: "https://amazon.in/dp/B789123456?tag=sastasmart-21",
      affiliate_flipkart: "https://flipkart.com/sony-wh-1000xm5?affid=sastasmart",
      features: ["30hr Battery", "Active Noise Cancelling", "Quick Charge", "Premium Sound"],
      availability: "In Stock",
      delivery: "Free Delivery",
      trending: true
    }
  ];

  // Initialize data
  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
    
    // Simulate real-time data updates
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Update product prices, stock, etc.
        setProducts(prev => prev.map(product => ({
          ...product,
          views: (product.views || 0) + Math.floor(Math.random() * 5)
        })));
      }, 30000); // Update every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Filter and search functionality
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Relevance - prioritize trending and flash deals
        filtered.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          if (a.flash_deal && !b.flash_deal) return -1;
          if (!a.flash_deal && b.flash_deal) return 1;
          return b.rating - a.rating;
        });
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  // Handle affiliate link clicks
  const handleAffiliateClick = (product, platform) => {
    const link = platform === 'amazon' ? product.affiliate_amazon : product.affiliate_flipkart;
    
    // Track click
    setEarnings(prev => ({
      clicks: prev.clicks + 1,
      revenue: prev.revenue + (product.price * 0.05) // Assume 5% commission
    }));

    // Add to recent views
    const recentView = {
      product: product.title,
      platform,
      time: new Date().toLocaleTimeString(),
      price: product.price
    };
    
    setDealAlerts(prev => [recentView, ...prev.slice(0, 9)]); // Keep last 10

    // Open affiliate link
    window.open(link, '_blank');
  };

  // Toggle favorites
  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  // Auto-chat responses
  const chatResponses = [
    "🔥 Check out today's flash deals!",
    "💰 Best price alerts set up for you!",
    "📱 New electronics just added!",
    "🎉 You saved ₹5000+ this month!",
    "🚀 Premium deals unlocked!"
  ];

  const simulateChat = () => {
    if (chatRef.current) {
      const response = chatResponses[Math.floor(Math.random() * chatResponses.length)];
      const chatDiv = document.createElement('div');
      chatDiv.className = 'bg-blue-100 p-2 rounded mb-2 text-sm';
      chatDiv.innerHTML = `<strong>SastaSmart Bot:</strong> ${response}`;
      chatRef.current.appendChild(chatDiv);
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const ProductCard = ({ product }) => (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${darkMode ? 'bg-gray-800 text-white' : ''}`}>
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {product.flash_deal && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
            <Zap className="w-3 h-3 inline mr-1" />
            FLASH DEAL
          </div>
        )}
        {product.trending && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            TRENDING
          </div>
        )}
        <button 
          onClick={() => toggleFavorite(product.id)}
          className={`absolute bottom-2 right-2 p-2 rounded-full transition-colors ${
            favorites.has(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
      
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
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded text-sm font-semibold transition-colors"
          >
            Amazon
          </button>
          <button 
            onClick={() => handleAffiliateClick(product, 'flipkart')}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm font-semibold transition-colors"
          >
            Flipkart
          </button>
        </div>

        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
          <span className="flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            {product.views || Math.floor(Math.random() * 1000)} views
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            2h ago
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg mr-3">
                <Gift className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SastaSmart
              </h1>
              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded">LIVE</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands, deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
              
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Bell className="w-6 h-6" />
                {dealAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {dealAlerts.length}
                  </span>
                )}
              </button>

              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <User className="w-6 h-6" />
                <span className="hidden md:block">Account</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-4 top-16 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Recent Activity</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {dealAlerts.length > 0 ? (
              dealAlerts.map((alert, index) => (
                <div key={index} className="p-3 border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="text-sm font-medium">{alert.product}</div>
                  <div className="text-xs text-gray-500">
                    Clicked on {alert.platform} at {alert.time}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No recent activity</div>
            )}
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className={`border-b transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                {earnings.clicks} Clicks Today
              </span>
              <span className="flex items-center text-blue-600">
                <Eye className="w-4 h-4 mr-1" />
                Live Updates Every 30s
              </span>
              <span className="flex items-center text-purple-600">
                <Bot className="w-4 h-4 mr-1" />
                AI-Powered Deals
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-1 px-3 py-1 rounded transition-colors ${
                  autoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                <span>Auto Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className={`p-4 rounded-lg border transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

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
                            : darkMode 
                            ? 'hover:bg-gray-700' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        <span className="text-sm">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>₹0</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="space-y-2">
                <h4 className="font-medium mb-3">Quick Filters</h4>
                <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Flash Deals
                </button>
                <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  Trending
                </button>
                <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                  <Star className="w-4 h-4 inline mr-2" />
                  Top Rated
                </button>
              </div>
            </div>

            {/* Earnings Dashboard */}
            <div className={`mt-4 p-4 rounded-lg border transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className="font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Earnings Today
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Clicks:</span>
                  <span className="font-bold text-blue-600">{earnings.clicks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Estimated Revenue:</span>
                  <span className="font-bold text-green-600">₹{Math.floor(earnings.revenue).toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((earnings.clicks / 100) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">Goal: 100 clicks/day</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredProducts.length} products found
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-blue-500 text-white' 
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-blue-500 text-white' 
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
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
                  <option value="newest">Latest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange([0, 100000]);
                  }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-8">
                <button className="px-8 py-3 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors font-semibold">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 space-y-3">
        {/* Chat Bot */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>

        {/* Quick Share */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'SastaSmart - Best Deals',
                text: 'Check out these amazing deals!',
                url: window.location.href
              });
            }
          }}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <Share2 className="w-6 h-6" />
        </button>

        {/* Bookmark Page */}
        <button
          onClick={() => {
            // Add to browser bookmarks
            if (window.external && window.external.AddFavorite) {
              window.external.AddFavorite(window.location.href, 'SastaSmart');
            } else {
              alert('Press Ctrl+D to bookmark this page!');
            }
          }}
          className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <Bookmark className="w-6 h-6" />
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
            <button
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div 
            ref={chatRef}
            className="flex-1 p-4 overflow-y-auto"
          >
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mb-3">
              <div className="flex items-center mb-2">
                <Bot className="w-4 h-4 mr-2 text-blue-500" />
                <strong className="text-blue-700 dark:text-blue-300">SastaSmart Bot</strong>
              </div>
              <p className="text-sm">Hi! I'm your personal deal finder. I can help you with:</p>
              <ul className="text-xs mt-2 space-y-1 text-blue-600 dark:text-blue-400">
                <li>• Finding best deals</li>
                <li>• Price comparisons</li>
                <li>• Product recommendations</li>
                <li>• Setting price alerts</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    simulateChat();
                    e.target.value = '';
                  }
                }}
              />
              <button
                onClick={simulateChat}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`mt-12 border-t transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg mr-3">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">SastaSmart</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Your ultimate destination for automated deal discovery. Save money with AI-powered price comparison.
              </p>
              <div className="flex space-x-3">
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
                  📱 Telegram
                </button>
                <button className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition-colors">
                  📢 Discord
                </button>
                <button className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition-colors">
                  📸 Instagram
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Flash Deals</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Trending Products</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Price Alerts</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Wishlist</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Compare Prices</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Fashion</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Home & Kitchen</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Books</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Sports</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Get notified about the best deals and exclusive offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors">
                  Subscribe
                </button>
              </div>
              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live updates every 30 seconds</span>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span>© 2025 SastaSmart. All rights reserved.</span>
              <span className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                {earnings.clicks} deals clicked today
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 lg:hidden z-40">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center p-2 text-blue-500">
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <Search className="w-5 h-5" />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <Heart className="w-5 h-5" />
            <span className="text-xs mt-1">Wishlist</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <Bell className="w-5 h-5" />
            <span className="text-xs mt-1">Alerts</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {false && ( // Set to true when loading
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-lg font-semibold">Finding Best Deals...</p>
            <p className="text-sm text-gray-500 mt-2">AI is scanning 1000+ products</p>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-20 right-4 space-y-2 z-50">
        {/* Example toast - would be managed by state */}
        {false && (
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg animate-fade-in-down">
            <div className="flex items-center">
              <ThumbsUp className="w-5 h-5 mr-2" />
              <span>New deal alert! iPhone 15 at ₹65,999</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SastaSmart;