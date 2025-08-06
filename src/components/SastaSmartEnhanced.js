import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, ShoppingCart, Heart, Star, Filter, Bell, User, Menu, X, TrendingUp, Zap, Gift, Tag, Clock, Eye, Share2, Download, Bot, MessageCircle, ThumbsUp, Bookmark, RefreshCw, Grid, List, SortAsc, ChevronDown, ChevronRight, Home, Smartphone, Laptop, Shirt, Book, Gamepad2, Camera, Headphones, Watch, Car, Utensils, MapPin, CreditCard, Truck, Shield, Award, Percent, DollarSign, Calendar, Phone, Mail, Settings, LogOut, Moon, Sun, Volume2, VolumeX, Wifi, WifiOff, Battery, Signal, Users, Target, BarChart3, PieChart, LineChart, Activity, Layers, Package, ShoppingBag, Lightbulb, Megaphone, AlertTriangle, CheckCircle, XCircle, Info, Play, Pause, SkipForward, SkipBack, Mic, MicOff, Video, VideoOff, Lock, Unlock, Upload, FolderOpen, FileText, Image, Link, Copy, Trash2, Edit, Save, Plus, Minus, RotateCcw, RotateCw, ZoomIn, ZoomOut, Maximize, Minimize, ExternalLink, QrCode, Scan, Globe, Languages, Crown, Gem, Sparkles, Send } from 'lucide-react';

const SastaSmart = () => {
  // Core state
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [dealAlerts, setDealAlerts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  
  // Enhanced features state
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState(new Set());
  const [wishlist, setWishlist] = useState(new Set());
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [layoutDensity, setLayoutDensity] = useState('comfortable');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [gamification, setGamification] = useState({ points: 0, level: 1, badges: [] });
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [budgetTracker, setBudgetTracker] = useState({ monthly: 10000, spent: 0 });
  const [cashback, setCashback] = useState({ total: 0, pending: 0 });
  const [earnings, setEarnings] = useState({ clicks: 0, revenue: 0 });
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [shareCount, setShareCount] = useState(0);
  const [screenTime, setScreenTime] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [installedPWA, setInstalledPWA] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [predictiveSearch, setPredictiveSearch] = useState([]);
  const [smartFilters, setSmartFilters] = useState({});
  const [aiRecommendations, setAiRecommendations] = useState([]);

  const chatRef = useRef(null);
  const speechRecognition = useRef(null);

  // Categories with icons
  const categories = [
    { id: 'all', name: 'All Products', icon: Home, color: 'blue' },
    { id: 'electronics', name: 'Electronics', icon: Smartphone, color: 'purple' },
    { id: 'computers', name: 'Computers', icon: Laptop, color: 'indigo' },
    { id: 'fashion', name: 'Fashion', icon: Shirt, color: 'pink' },
    { id: 'books', name: 'Books', icon: Book, color: 'green' },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'red' },
    { id: 'photography', name: 'Photography', icon: Camera, color: 'yellow' },
    { id: 'audio', name: 'Audio', icon: Headphones, color: 'orange' },
    { id: 'watches', name: 'Watches', icon: Watch, color: 'teal' },
    { id: 'automotive', name: 'Automotive', icon: Car, color: 'gray' },
    { id: 'home', name: 'Home & Kitchen', icon: Utensils, color: 'emerald' },
    { id: 'sports', name: 'Sports & Fitness', icon: Target, color: 'lime' }
  ];

  // Sample products data
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
      flash_deal: true,
      views: 1250,
      saves: 89,
      shares: 45,
      cashback: 5,
      warranty: "1 Year",
      returnPolicy: "10 Days",
      emi: true,
      exchange: true,
      verified: true,
      sustainable: true,
      bestSeller: true,
      editorChoice: true,
      stockLevel: 15,
      estimatedDelivery: "2 days",
      sellerId: "samsung_official",
      sellerRating: 4.8,
      tags: ["5G", "Camera", "Premium", "Android"]
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
      trending: true,
      views: 890,
      saves: 156,
      shares: 78,
      cashback: 3,
      warranty: "1 Year",
      returnPolicy: "14 Days",
      emi: true,
      exchange: false,
      verified: true,
      sustainable: true,
      newArrival: true,
      editorChoice: true,
      stockLevel: 3,
      estimatedDelivery: "3 days",
      sellerId: "apple_official",
      sellerRating: 4.9,
      tags: ["MacBook", "M2", "Laptop", "Professional"]
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
      flash_deal: true,
      views: 2100,
      saves: 234,
      shares: 125,
      cashback: 2,
      warranty: "6 Months",
      returnPolicy: "30 Days",
      emi: false,
      exchange: true,
      verified: true,
      bestSeller: true,
      stockLevel: 45,
      estimatedDelivery: "1 day",
      sellerId: "nike_official",
      sellerRating: 4.7,
      tags: ["Sneakers", "Classic", "Sports", "Casual"]
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
      trending: true,
      views: 1580,
      saves: 278,
      shares: 156,
      cashback: 4,
      warranty: "1 Year",
      returnPolicy: "15 Days",
      emi: true,
      exchange: false,
      verified: true,
      sustainable: true,
      bestSeller: true,
      editorChoice: true,
      stockLevel: 22,
      estimatedDelivery: "2 days",
      sellerId: "sony_official",
      sellerRating: 4.8,
      tags: ["Headphones", "Noise Cancelling", "Premium", "Audio"]
    },
    {
      id: 5,
      title: "OnePlus 12 5G",
      price: 64999,
      originalPrice: 69999,
      discount: 7,
      rating: 4.4,
      reviews: 756,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      category: "electronics",
      brand: "OnePlus",
      affiliate_amazon: "https://amazon.in/dp/B789123457?tag=sastasmart-21",
      affiliate_flipkart: "https://flipkart.com/oneplus-12-5g?affid=sastasmart",
      features: ["12GB RAM", "256GB Storage", "Hasselblad Camera", "100W Fast Charging"],
      availability: "In Stock",
      delivery: "Free Delivery",
      views: 756,
      saves: 89,
      shares: 34,
      cashback: 3,
      warranty: "1 Year",
      returnPolicy: "10 Days",
      emi: true,
      exchange: true,
      verified: true,
      newArrival: true,
      stockLevel: 28,
      estimatedDelivery: "1 day",
      sellerId: "oneplus_official",
      sellerRating: 4.6,
      tags: ["5G", "Fast Charging", "Camera", "Android"]
    },
    {
      id: 6,
      title: "Boat Airdopes 800",
      price: 2999,
      originalPrice: 4999,
      discount: 40,
      rating: 4.1,
      reviews: 3456,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
      category: "audio",
      brand: "Boat",
      affiliate_amazon: "https://amazon.in/dp/B789123458?tag=sastasmart-21",
      affiliate_flipkart: "https://flipkart.com/boat-airdopes-800?affid=sastasmart",
      features: ["Active Noise Cancelling", "50HR Playback", "BEAST Mode", "IPX7"],
      availability: "In Stock",
      delivery: "Free Delivery",
      trending: true,
      flash_deal: true,
      views: 3456,
      saves: 567,
      shares: 234,
      cashback: 1,
      warranty: "1 Year",
      returnPolicy: "10 Days",
      emi: false,
      exchange: false,
      verified: true,
      local: true,
      bestSeller: true,
      stockLevel: 156,
      estimatedDelivery: "1 day",
      sellerId: "boat_official",
      sellerRating: 4.3,
      tags: ["TWS", "Budget", "Indian Brand", "Gaming"]
    }
  ];

  // Themes
  const themes = {
    default: 'from-blue-500 to-purple-600',
    ocean: 'from-blue-600 to-teal-500',
    sunset: 'from-orange-500 to-red-500',
    forest: 'from-green-500 to-emerald-600',
    galaxy: 'from-purple-500 to-pink-600',
    minimal: 'from-gray-400 to-gray-600'
  };

  // Initialize products
  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
    
    // Screen time tracking
    const screenTimeInterval = setInterval(() => {
      setScreenTime(prev => prev + 1);
    }, 1000);

    // Battery simulation
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, prev - 0.1));
    }, 60000);

    // Network status
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Auto-refresh
    if (autoRefresh && networkStatus) {
      const interval = setInterval(() => {
        setProducts(prev => prev.map(product => ({
          ...product,
          views: (product.views || 0) + Math.floor(Math.random() * 5),
          saves: (product.saves || 0) + Math.floor(Math.random() * 2)
        })));
      }, 30000);
      
      return () => {
        clearInterval(interval);
        clearInterval(screenTimeInterval);
        clearInterval(batteryInterval);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }

    return () => {
      clearInterval(screenTimeInterval);
      clearInterval(batteryInterval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [autoRefresh, networkStatus]);

  // Filter and search functionality
  useEffect(() => {
    let filtered = products;

    // Search
    if (searchQuery) {
      const searchTerms = searchQuery.toLowerCase().split(' ');
      filtered = filtered.filter(product => {
        const searchableText = `${product.title} ${product.brand} ${product.features.join(' ')} ${product.tags?.join(' ') || ''}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
      
      // Update suggestions
      const suggestions = products
        .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5)
        .map(p => p.title);
      setPredictiveSearch(suggestions);
    } else {
      setPredictiveSearch([]);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Smart filters
    Object.entries(smartFilters).forEach(([filter, value]) => {
      if (value) {
        switch (filter) {
          case 'freeDelivery':
            filtered = filtered.filter(p => p.delivery === 'Free Delivery');
            break;
          case 'inStock':
            filtered = filtered.filter(p => p.availability === 'In Stock');
            break;
          case 'highRated':
            filtered = filtered.filter(p => p.rating >= 4.0);
            break;
          case 'fastDelivery':
            filtered = filtered.filter(p => p.estimatedDelivery === '1 day');
            break;
          case 'cashback':
            filtered = filtered.filter(p => p.cashback > 0);
            break;
          case 'emi':
            filtered = filtered.filter(p => p.emi);
            break;
          case 'exchange':
            filtered = filtered.filter(p => p.exchange);
            break;
          case 'verified':
            filtered = filtered.filter(p => p.verified);
            break;
          case 'sustainable':
            filtered = filtered.filter(p => p.sustainable);
            break;
          case 'local':
            filtered = filtered.filter(p => p.local);
            break;
        }
      }
    });

    // Sorting
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
      case 'popularity':
        filtered.sort((a, b) => (b.views + b.saves + b.shares) - (a.views + a.saves + a.shares));
        break;
      default:
        // Relevance sorting
        filtered.sort((a, b) => {
          let scoreA = 0, scoreB = 0;
          if (a.trending) scoreA += 10;
          if (b.trending) scoreB += 10;
          if (a.flash_deal) scoreA += 8;
          if (b.flash_deal) scoreB += 8;
          if (a.bestSeller) scoreA += 4;
          if (b.bestSeller) scoreB += 4;
          scoreA += a.rating * 2;
          scoreB += b.rating * 2;
          return scoreB - scoreA;
        });
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy, smartFilters]);

  // Voice search
  const handleVoiceSearch = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      showNotification('Voice search not supported in this browser', 'warning');
      return;
    }

    if (isListening) {
      setIsListening(false);
    } else {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        showNotification(`Searching for "${transcript}"`, 'info');
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        showNotification('Voice search failed', 'error');
      };
      
      recognition.start();
    }
  }, [isListening]);

  // Affiliate link handling
  const handleAffiliateClick = useCallback((product, platform) => {
    const link = platform === 'amazon' ? product.affiliate_amazon : product.affiliate_flipkart;
    
    // Update earnings
    setEarnings(prev => ({
      clicks: prev.clicks + 1,
      revenue: prev.revenue + (product.price * 0.05)
    }));

    // Update gamification
    setGamification(prev => ({
      ...prev,
      points: prev.points + 10,
      level: Math.floor((prev.points + 10) / 1000) + 1
    }));

    // Add to recent activity
    const activity = {
      id: Date.now(),
      type: 'success',
      product: product.title,
      platform,
      time: new Date().toLocaleTimeString(),
      price: product.price,
      image: product.image,
      savings: product.originalPrice - product.price,
      message: `Redirecting to ${platform}...`
    };
    
    setDealAlerts(prev => [activity, ...prev.slice(0, 19)]);

    // Update recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });

    // Update budget
    setBudgetTracker(prev => ({
      ...prev,
      spent: prev.spent + product.price
    }));

    // Cashback
    if (product.cashback > 0) {
      setCashback(prev => ({
        ...prev,
        pending: prev.pending + (product.price * product.cashback / 100)
      }));
    }

    // Loyalty points
    setLoyaltyPoints(prev => prev + Math.floor(product.price / 100));

    // Open link
    window.open(link, '_blank');
  }, []);

  // Notification system
  const showNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    
    setDealAlerts(prev => [notification, ...prev.slice(0, 19)]);
    
    setTimeout(() => {
      setDealAlerts(prev => prev.filter(alert => alert.id !== notification.id));
    }, 5000);
  };

  // Toggle functions
  const toggleFavorite = useCallback((productId) => {
    const newFavorites = new Set(favorites);
    const product = products.find(p => p.id === productId);
    
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
      showNotification(`Removed ${product?.title} from favorites`, 'info');
    } else {
      newFavorites.add(productId);
      showNotification(`Added ${product?.title} to favorites`, 'success');
      setGamification(prev => ({ ...prev, points: prev.points + 5 }));
    }
    
    setFavorites(newFavorites);
  }, [favorites, products]);

  const toggleWishlist = useCallback((productId) => {
    const newWishlist = new Set(wishlist);
    const product = products.find(p => p.id === productId);
    
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
      showNotification(`Removed ${product?.title} from wishlist`, 'info');
    } else {
      newWishlist.add(productId);
      showNotification(`Added ${product?.title} to wishlist`, 'success');
    }
    
    setWishlist(newWishlist);
  }, [wishlist, products]);

  const toggleCompare = useCallback((productId) => {
    const newCompareList = new Set(compareList);
    const product = products.find(p => p.id === productId);
    
    if (newCompareList.has(productId)) {
      newCompareList.delete(productId);
      showNotification(`Removed ${product?.title} from compare`, 'info');
    } else if (newCompareList.size >= 4) {
      showNotification('You can compare maximum 4 products', 'warning');
      return;
    } else {
      newCompareList.add(productId);
      showNotification(`Added ${product?.title} to compare`, 'success');
    }
    
    setCompareList(newCompareList);
  }, [compareList, products]);

  // AI recommendations
  const generateAIRecommendations = useCallback(() => {
    const recommendations = products
      .filter(product => 
        favorites.has(product.id) || 
        wishlist.has(product.id) || 
        product.trending || 
        product.bestSeller
      )
      .slice(0, 10);

    setAiRecommendations(recommendations);
    showNotification('AI recommendations updated!', 'success');
  }, [favorites, wishlist, products]);

  // Chat responses
  const chatResponses = [
    "🔥 Check out today's flash deals! Save up to 50%",
    "💰 Best price alerts set up for you!",
    "📱 New electronics just added with exclusive discounts!",
    "🎉 You saved ₹5000+ this month! Keep it up!",
    "🚀 Premium deals unlocked for loyal users!",
    `💎 Your loyalty points: ${loyaltyPoints} pts`,
    `📊 Budget tracker: ₹${budgetTracker.spent}/₹${budgetTracker.monthly}`,
    `🏆 You're level ${gamification.level} deal hunter!`,
    `💸 Pending cashback: ₹${Math.floor(cashback.pending)}`,
    `⚡ ${compareList.size} products in compare list`
  ];

  const simulateChat = useCallback(() => {
    if (chatRef.current) {
      const response = chatResponses[Math.floor(Math.random() * chatResponses.length)];
      const chatDiv = document.createElement('div');
      chatDiv.className = `p-3 rounded-lg mb-3 max-w-xs ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`;
      chatDiv.innerHTML = `
        <div class="flex items-start space-x-2">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">AI</div>
          <div class="flex-1">
            <div class="text-xs text-gray-500 mb-1">${new Date().toLocaleTimeString()}</div>
            <div class="text-sm">${response}</div>
          </div>
        </div>
      `;
      chatRef.current.appendChild(chatDiv);
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatResponses, darkMode, loyaltyPoints, budgetTracker, gamification, cashback, compareList]);

  // PWA Installation
  const installPWA = useCallback(() => {
    setInstalledPWA(true);
    showNotification('SastaSmart app installed successfully!', 'success');
  }, []);

  // Theme switching
  const switchTheme = useCallback((theme) => {
    setCurrentTheme(theme);
  }, []);

  // Emergency mode
  const toggleEmergencyMode = useCallback(() => {
    setEmergencyMode(!emergencyMode);
    setViewMode('list');
    setShowFilters(false);
    showNotification(emergencyMode ? 'Emergency mode disabled' : 'Emergency mode enabled', 'info');
  }, [emergencyMode]);

  // Product Card Component
  const ProductCard = ({ product }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    
    return (
      <div className={`relative group ${emergencyMode ? 'border-2 border-red-500' : ''} ${layoutDensity === 'compact' ? 'p-2' : 'p-4'} bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${animationsEnabled ? 'transform hover:scale-105' : ''}`}>
        {/* Product Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
          {product.flash_deal && (
            <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              FLASH
            </div>
          )}
          {product.trending && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              TRENDING
            </div>
          )}
          {product.verified && (
            <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              VERIFIED
            </div>
          )}
          {product.bestSeller && (
            <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
              <Crown className="w-3 h-3 mr-1" />
              BESTSELLER
            </div>
          )}
          {product.editorChoice && (
            <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
              <Award className="w-3 h-3 mr-1" />
              EDITOR'S CHOICE
            </div>
          )}
          {product.newArrival && (
            <div className="bg-pink-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              NEW
            </div>
          )}
          {product.local && (
            <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              LOCAL
            </div>
          )}
          {product.sustainable && (
            <div className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
              <Lightbulb className="w-3 h-3 mr-1" />
              ECO
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 z-10 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => toggleFavorite(product.id)}
            className={`p-2 rounded-full transition-all ${
              favorites.has(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
            title="Add to Favorites"
          >
            <Heart className="w-4 h-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
          </button>
          
          <button 
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-full transition-all ${
              wishlist.has(product.id) ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600 hover:bg-yellow-500 hover:text-white'
            }`}
            title="Add to Wishlist"
          >
            <Bookmark className="w-4 h-4" fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
          </button>
          
          {compareMode && (
            <button 
              onClick={() => toggleCompare(product.id)}
              className={`p-2 rounded-full transition-all ${
                compareList.has(product.id) ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-blue-500 hover:text-white'
              }`}
              title="Add to Compare"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          )}
          
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: product.title,
                  text: `Check out this deal: ${product.title} at ₹${product.price}`,
                  url: window.location.href
                });
                setShareCount(prev => prev + 1);
              }
            }}
            className="p-2 rounded-full bg-white text-gray-600 hover:bg-green-500 hover:text-white transition-all"
            title="Share Product"
          >
            <Share2 className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 rounded-full bg-white text-gray-600 hover:bg-purple-500 hover:text-white transition-all"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg mb-4">
          {!imageLoaded && (
            <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <img 
            src={product.image} 
            alt={product.title}
            className={`w-full h-48 object-cover rounded-lg transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Stock Level Indicator */}
          {product.stockLevel <= 5 && (
            <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
              Only {product.stockLevel} left!
            </div>
          )}
          
          {/* Discount Badge */}
          <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            {product.discount}% OFF
          </div>
        </div>
        
        <div className={`${layoutDensity === 'compact' ? 'p-2' : 'p-4'}`}>
          {/* Product Title & Brand */}
          <div className="mb-2">
            <h3 className={`font-semibold line-clamp-2 ${fontSize === 'large' ? 'text-lg' : fontSize === 'small' ? 'text-xs' : 'text-sm'} mb-1`}>
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{product.brand}</span>
              <div className="flex items-center space-x-1">
                {product.emi && <CreditCard className="w-3 h-3 text-blue-500" title="EMI Available" />}
                {product.exchange && <RefreshCw className="w-3 h-3 text-green-500" title="Exchange Available" />}
                {product.delivery === 'Free Delivery' && <Truck className="w-3 h-3 text-purple-500" title="Free Delivery" />}
              </div>
            </div>
          </div>
          
          {/* Rating & Reviews */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-500 text-xs ml-2">({product.reviews})</span>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {product.views}
              </div>
              <div className="flex items-center">
                <Heart className="w-3 h-3 mr-1" />
                {product.saves}
              </div>
              <div className="flex items-center">
                <Share2 className="w-3 h-3 mr-1" />
                {product.shares}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-3">
            <div className="flex items-baseline space-x-2">
              <span className={`font-bold text-green-600 ${fontSize === 'large' ? 'text-2xl' : fontSize === 'small' ? 'text-lg' : 'text-xl'}`}>
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-semibold">
                {product.discount}% OFF
              </span>
            </div>
            
            {/* Additional Pricing Info */}
            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
              <span>
                {product.cashback > 0 && (
                  <span className="text-green-600 font-medium">
                    +{product.cashback}% cashback
                  </span>
                )}
              </span>
              <span>EMI from ₹{Math.floor(product.price / 12).toLocaleString()}</span>
            </div>
          </div>

          {/* Features Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.features.slice(0, layoutDensity === 'compact' ? 2 : 3).map((feature, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {product.features.length > 3 && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                +{product.features.length - 3} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <button 
                onClick={() => handleAffiliateClick(product, 'amazon')}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 px-3 rounded font-semibold transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <span>Amazon</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <button 
                onClick={() => handleAffiliateClick(product, 'flipkart')}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-3 rounded font-semibold transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <span>Flipkart</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            
            {/* Secondary Info */}
            <div className="flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <Truck className="w-3 h-3 mr-1" />
                  {product.estimatedDelivery}
                </span>
                <span className="flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  {product.warranty}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className={`w-2 h-2 rounded-full ${product.availability === 'In Stock' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>{product.availability}</span>
              </div>
            </div>
          </div>

          {/* Quick Details Dropdown */}
          {showDetails && (
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-medium">Seller:</span>
                  <div className="flex items-center">
                    <span>{product.sellerId}</span>
                    <div className="flex items-center ml-2">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="ml-1">{product.sellerRating}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.tags?.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} ${fontSize === 'large' ? 'text-lg' : fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
      {/* Enhanced Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'} border-b`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className={`bg-gradient-to-r ${themes[currentTheme]} text-white p-2 rounded-lg mr-3 ${animationsEnabled ? 'animate-pulse' : ''}`}>
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r ${themes[currentTheme]} bg-clip-text text-transparent`}>
                  SastaSmart
                </h1>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="bg-green-500 text-white px-2 py-0.5 rounded animate-pulse">LIVE</span>
                  {installedPWA && <span className="bg-blue-500 text-white px-2 py-0.5 rounded">PWA</span>}
                  {offlineMode && <span className="bg-red-500 text-white px-2 py-0.5 rounded">OFFLINE</span>}
                  {emergencyMode && <span className="bg-orange-500 text-white px-2 py-0.5 rounded">EMERGENCY</span>}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands, deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-20 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } ${emergencyMode ? 'border-red-500 ring-red-500' : ''}`}
                />
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                
                {/* Voice Search */}
                <button
                  onClick={handleVoiceSearch}
                  className={`absolute right-12 top-2 p-2 rounded-lg transition-all ${
                    isListening ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  title="Voice Search"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                
                {/* QR Scanner */}
                <button
                  onClick={() => showNotification('QR Scanner opened', 'info')}
                  className="absolute right-3 top-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  title="QR Scanner"
                >
                  <QrCode className="w-4 h-4" />
                </button>

                {/* Search Suggestions */}
                {predictiveSearch.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-lg shadow-lg z-50">
                    {predictiveSearch.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setPredictiveSearch([]);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        <Search className="w-3 h-3 inline mr-2" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-2">
              {/* Network Status */}
              <div className={`p-2 rounded-lg ${networkStatus ? 'text-green-500' : 'text-red-500'}`}>
                {networkStatus ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              </div>

              {/* Battery Level */}
              <div className="hidden md:flex items-center space-x-1 text-xs">
                <Battery className="w-4 h-4" />
                <span>{Math.floor(batteryLevel)}%</span>
              </div>

              {/* Compare Mode */}
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`p-2 rounded-lg transition-all relative ${
                  compareMode ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                title="Compare Mode"
              >
                <BarChart3 className="w-5 h-5" />
                {compareList.size > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {compareList.size}
                  </span>
                )}
              </button>

              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-110"
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
              </button>
              
              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {dealAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {dealAlerts.length > 99 ? '99+' : dealAlerts.length}
                  </span>
                )}
              </button>

              {/* Emergency Mode */}
              <button
                onClick={toggleEmergencyMode}
                className={`p-2 rounded-lg transition-all ${
                  emergencyMode 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                title="Emergency Mode"
              >
                <AlertTriangle className="w-5 h-5" />
              </button>

              {/* User Account */}
              <button 
                onClick={() => showNotification(`Level ${gamification.level} Hunter | ${loyaltyPoints} points`, 'info')}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <div className="relative">
                  <User className="w-5 h-5" />
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full text-xs flex items-center justify-center text-white ${
                    gamification.level >= 5 ? 'bg-purple-500' : gamification.level >= 3 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>
                    {gamification.level}
                  </div>
                </div>
                <span className="hidden md:block text-sm font-medium">
                  Level {gamification.level}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-4 top-20 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setDealAlerts([])}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {dealAlerts.length > 0 ? (
              dealAlerts.map((alert, index) => (
                <div key={index} className="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start space-x-3">
                    {alert.image ? (
                      <img src={alert.image} alt="" className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className={`w-12 h-12 rounded flex items-center justify-center ${
                        alert.type === 'success' ? 'bg-green-100 text-green-600' :
                        alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        alert.type === 'error' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {alert.type === 'success' ? <CheckCircle className="w-6 h-6" /> :
                         alert.type === 'warning' ? <AlertTriangle className="w-6 h-6" /> :
                         alert.type === 'error' ? <XCircle className="w-6 h-6" /> :
                         <Info className="w-6 h-6" />}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium">{alert.product || alert.message}</div>
                      {alert.platform && (
                        <div className="text-xs text-gray-500 mt-1">
                          Clicked on {alert.platform} • {alert.time}
                        </div>
                      )}
                      {alert.savings && (
                        <div className="text-xs text-green-600 font-medium mt-1">
                          You saved ₹{alert.savings.toLocaleString()}
                        </div>
                      )}
                      <div className="text-xs text-gray-400">
                        {alert.timestamp ? new Date(alert.timestamp).toLocaleTimeString() : alert.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No notifications yet</p>
                <p className="text-xs mt-1">We'll notify you about great deals!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className={`border-b transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                {earnings.clicks} Clicks Today
              </span>
              <span className="flex items-center text-blue-600">
                <Eye className="w-4 h-4 mr-1" />
                {networkStatus ? 'Live Updates' : 'Cached Data'}
              </span>
              <span className="flex items-center text-purple-600">
                <Bot className="w-4 h-4 mr-1" />
                AI-Powered Deals
              </span>
              <span className="flex items-center text-orange-600">
                <Crown className="w-4 h-4 mr-1" />
                Level {gamification.level} Hunter
              </span>
              <span className="flex items-center text-yellow-600">
                <Gem className="w-4 h-4 mr-1" />
                {loyaltyPoints} Points
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="flex items-center text-green-600">
                <DollarSign className="w-4 h-4 mr-1" />
                ₹{Math.floor(cashback.pending)} Cashback
              </span>
              <span className="flex items-center text-indigo-600">
                <Calendar className="w-4 h-4 mr-1" />
                Budget: ₹{budgetTracker.spent}/₹{budgetTracker.monthly}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
                    autoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <RefreshCw className={`w-3 h-3 ${autoRefresh ? 'animate-spin' : ''}`} />
                  <span>Auto</span>
                </button>
                <span className="text-gray-500">
                  {Math.floor(screenTime / 60)}m {screenTime % 60}s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Filters */}
            <div className={`p-4 rounded-xl border transition-colors mb-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Smart Filters
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 12).map(category => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-2 rounded-lg transition-all flex flex-col items-center text-xs ${
                          selectedCategory === category.id
                            ? `bg-${category.color}-500 text-white`
                            : darkMode 
                            ? 'hover:bg-gray-700 border border-gray-600' 
                            : 'hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 mb-1" />
                        <span className="text-center leading-tight">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 flex items-center justify-between">
                  Price Range
                  <span className="text-sm text-gray-500">₹{priceRange[1].toLocaleString()}</span>
                </h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹0</span>
                    <span>₹50K</span>
                    <span>₹1L</span>
                    <span>₹2L+</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {[1000, 5000, 25000, 100000].map(price => (
                      <button
                        key={price}
                        onClick={() => setPriceRange([0, price])}
                        className="text-xs p-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                      >
                        ₹{price >= 1000 ? `${price/1000}K` : price}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="space-y-2">
                <h4 className="font-medium mb-3">Quick Filters</h4>
                {[
                  { key: 'freeDelivery', label: 'Free Delivery', icon: Truck },
                  { key: 'inStock', label: 'In Stock', icon: Package },
                  { key: 'highRated', label: '4+ Rating', icon: Star },
                  { key: 'fastDelivery', label: 'Same Day', icon: Zap },
                  { key: 'cashback', label: 'Cashback', icon: DollarSign },
                  { key: 'emi', label: 'EMI Available', icon: CreditCard },
                  { key: 'exchange', label: 'Exchange', icon: RefreshCw },
                  { key: 'verified', label: 'Verified', icon: Shield },
                  { key: 'sustainable', label: 'Eco-Friendly', icon: Lightbulb },
                  { key: 'local', label: 'Local Brand', icon: MapPin }
                ].map(filter => {
                  const IconComponent = filter.icon;
                  return (
                    <label key={filter.key} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={smartFilters[filter.key] || false}
                        onChange={(e) => setSmartFilters(prev => ({
                          ...prev,
                          [filter.key]: e.target.checked
                        }))}
                        className="rounded accent-blue-500"
                      />
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm">{filter.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Dashboard */}
            <div className={`p-4 rounded-xl border transition-colors mb-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className="font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
                Dashboard
              </h3>
              <div className="space-y-4">
                {/* Earnings */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Today's Earnings</span>
                    <span className="font-bold text-green-600">₹{Math.floor(earnings.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((earnings.clicks / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Goal: 100 clicks/day</p>
                </div>

                {/* Budget Tracker */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Monthly Budget</span>
                    <span className={`font-bold ${budgetTracker.spent > budgetTracker.monthly * 0.8 ? 'text-red-600' : 'text-blue-600'}`}>
                      ₹{budgetTracker.spent}/₹{budgetTracker.monthly}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        budgetTracker.spent > budgetTracker.monthly ? 'bg-red-500' :
                        budgetTracker.spent > budgetTracker.monthly * 0.8 ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min((budgetTracker.spent / budgetTracker.monthly) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Loyalty Points */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Loyalty Points</span>
                    <span className="font-bold text-purple-600">{loyaltyPoints}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Next reward at {Math.ceil(loyaltyPoints / 1000) * 1000} points
                  </div>
                </div>

                {/* Gamification */}
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Hunter Level</span>
                    <div className="flex items-center">
                      <Crown className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-bold">{gamification.level}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(gamification.points % 1000) / 10}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {1000 - (gamification.points % 1000)} points to next level
                  </p>
                </div>
              </div>
            </div>

            {/* Recently Viewed */}
            {recentlyViewed.length > 0 && (
              <div className={`p-4 rounded-xl border transition-colors mb-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  Recently Viewed
                </h3>
                <div className="space-y-2">
                  {recentlyViewed.slice(0, 3).map(product => (
                    <div key={product.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      <img src={product.image} alt={product.title} className="w-8 h-8 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{product.title}</div>
                        <div className="text-xs text-green-600">₹{product.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recommendations */}
            {aiRecommendations.length > 0 && (
              <div className={`p-4 rounded-xl border transition-colors mb-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-purple-500" />
                  AI Picks for You
                </h3>
                <div className="space-y-2">
                  {aiRecommendations.slice(0, 3).map(product => (
                    <div key={product.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      <img src={product.image} alt={product.title} className="w-8 h-8 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{product.title}</div>
                        <div className="text-xs text-green-600">₹{product.price.toLocaleString()}</div>
                        <div className="text-xs text-purple-600">{product.discount}% OFF</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center space-x-4 flex-wrap">
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
                  {selectedCategory !== 'all' && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {categories.find(c => c.id === selectedCategory)?.name}
                    </span>
                  )}
                </div>

                {/* Active Filters */}
                {Object.entries(smartFilters).filter(([_, value]) => value).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(smartFilters)
                      .filter(([_, value]) => value)
                      .map(([key, _]) => {
                        const filterName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        return (
                          <span key={key} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center">
                            {filterName}
                            <button
                              onClick={() => setSmartFilters(prev => ({ ...prev, [key]: false }))}
                              className="ml-1 hover:text-green-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {/* Theme Selector */}
                <select
                  value={currentTheme}
                  onChange={(e) => switchTheme(e.target.value)}
                  className={`px-3 py-2 border rounded-lg text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                >
                  <option value="default">Default</option>
                  <option value="ocean">Ocean</option>
                  <option value="sunset">Sunset</option>
                  <option value="forest">Forest</option>
                  <option value="galaxy">Galaxy</option>
                  <option value="minimal">Minimal</option>
                </select>

                {/* Layout Density */}
                <select
                  value={layoutDensity}
                  onChange={(e) => setLayoutDensity(e.target.value)}
                  className={`px-3 py-2 border rounded-lg text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                >
                  <option value="comfortable">Comfortable</option>
                  <option value="compact">Compact</option>
                  <option value="spacious">Spacious</option>
                </select>

                {/* Font Size */}
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className={`px-3 py-2 border rounded-lg text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                >
                  <option value="small">Small</option>
                  <option value="normal">Normal</option>
                  <option value="large">Large</option>
                </select>

                {/* View Mode */}
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-blue-500 text-white' 
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                    title="Grid View"
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
                    title="List View"
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
                  <option value="relevance">🎯 Relevance</option>
                  <option value="price_low">💰 Price: Low to High</option>
                  <option value="price_high">💎 Price: High to Low</option>
                  <option value="rating">⭐ Top Rated</option>
                  <option value="discount">🔥 Best Discount</option>
                  <option value="newest">✨ Latest</option>
                  <option value="popularity">📈 Most Popular</option>
                  <option value="cashback">💸 Best Cashback</option>
                  <option value="delivery">🚀 Fastest Delivery</option>
                </select>
              </div>
            </div>

            {/* Compare Bar */}
            {compareList.size > 0 && (
              <div className={`mb-6 p-4 rounded-xl border-2 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Compare Products ({compareList.size}/4)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        showNotification(`Comparing ${compareList.size} products`, 'info');
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Compare Now
                    </button>
                    <button
                      onClick={() => setCompareList(new Set())}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? layoutDensity === 'compact' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5' 
                  : layoutDensity === 'spacious'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
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
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setPriceRange([0, 100000]);
                      setSmartFilters({});
                    }}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => generateAIRecommendations()}
                    className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    Get AI Suggestions
                  </button>
                </div>
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-8">
                <button 
                  onClick={() => showNotification('Loading more products...', 'info')}
                  className="px-8 py-3 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors font-semibold flex items-center space-x-2 mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Load More Products</span>
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 space-y-3 z-40">
        {/* PWA Install */}
        {!installedPWA && (
          <button
            onClick={installPWA}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            title="Install App"
          >
            <Download className="w-6 h-6" />
          </button>
        )}

        {/* AI Chat Bot */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${chatOpen ? 'animate-pulse' : ''}`}
          title="AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>

        {/* Smart Share */}
        <button
          onClick={() => {
            const shareData = {
              title: 'SastaSmart - Best Deals Found!',
              text: `I found amazing deals on SastaSmart! Check out ${filteredProducts.length} products with great discounts!`,
              url: window.location.href
            };
            
            if (navigator.share) {
              navigator.share(shareData);
            } else if (navigator.clipboard) {
              navigator.clipboard.writeText(`${shareData.title} ${shareData.text} ${shareData.url}`);
              showNotification('Link copied to clipboard!', 'success');
            }
            setShareCount(prev => prev + 1);
          }}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          title="Share Deals"
        >
          <Share2 className="w-6 h-6" />
        </button>

        {/* Quick Actions Menu */}
        <div className="relative group">
          <button className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <Plus className="w-6 h-6" />
          </button>
          
          {/* Quick Actions Dropdown */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border p-2 space-y-1 whitespace-nowrap">
              <button
                onClick={() => showNotification('Press Ctrl+D to bookmark!', 'info')}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm w-full"
              >
                <Bookmark className="w-4 h-4" />
                <span>Bookmark</span>
              </button>
              
              <button
                onClick={() => {
                  setAccessibilityMode(!accessibilityMode);
                  showNotification(`Accessibility mode ${accessibilityMode ? 'disabled' : 'enabled'}`, 'info');
                }}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm w-full"
              >
                <Eye className="w-4 h-4" />
                <span>Accessibility</span>
              </button>
              
              <button
                onClick={() => {
                  setOfflineMode(!offlineMode);
                  showNotification(`Offline mode ${offlineMode ? 'disabled' : 'enabled'}`, 'info');
                }}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm w-full"
              >
                {offlineMode ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
                <span>Offline Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border flex flex-col z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold">SastaSmart AI</span>
                <div className="text-xs opacity-80">Online • Smart Assistant</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-white/80 hover:text-white">
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div 
            ref={chatRef}
            className="flex-1 p-4 overflow-y-auto space-y-3"
          >
            {/* Welcome Message */}
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Just now</div>
                  <div className="text-sm">
                    <p className="mb-2">Hi! I'm your personal deal finder. I can help you with:</p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div className="flex items-center space-x-1">
                        <Target className="w-3 h-3" />
                        <span>Find deals</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BarChart3 className="w-3 h-3" />
                        <span>Compare prices</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bell className="w-3 h-3" />
                        <span>Price alerts</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>Recommendations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => {
                  generateAIRecommendations();
                  simulateChat();
                }}
                className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 p-2 rounded-lg text-xs flex items-center space-x-1 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                <Lightbulb className="w-3 h-3" />
                <span>Get Suggestions</span>
              </button>
              <button 
                onClick={() => {
                  setSelectedCategory('electronics');
                  simulateChat();
                }}
                className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-2 rounded-lg text-xs flex items-center space-x-1 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              >
                <Zap className="w-3 h-3" />
                <span>Flash Deals</span>
              </button>
              <button 
                onClick={() => {
                  setSortBy('discount');
                  simulateChat();
                }}
                className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 p-2 rounded-lg text-xs flex items-center space-x-1 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
              >
                <Percent className="w-3 h-3" />
                <span>Best Discounts</span>
              </button>
              <button 
                onClick={() => {
                  showNotification('Price alerts set for your wishlist!', 'success');
                  simulateChat();
                }}
                className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 p-2 rounded-lg text-xs flex items-center space-x-1 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Bell className="w-3 h-3" />
                <span>Set Alerts</span>
              </button>
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    // Add user message
                    const userDiv = document.createElement('div');
                    userDiv.className = 'bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-sm mb-2 ml-8';
                    userDiv.innerHTML = `<div class="text-xs text-gray-500 mb-1">You</div>${e.target.value}`;
                    chatRef.current.appendChild(userDiv);
                    
                    // Simulate AI response
                    setTimeout(() => {
                      simulateChat();
                    }, 1000);
                    
                    e.target.value = '';
                    chatRef.current.scrollTop = chatRef.current.scrollHeight;
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Ask me anything..."]');
                  if (input && input.value.trim()) {
                    input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
                  } else {
                    simulateChat();
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Voice Input Button */}
            <div className="flex justify-center mt-2">
              <button
                onClick={handleVoiceSearch}
                className={`p-2 rounded-full transition-all ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                title="Voice Input"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`mt-12 border-t transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className={`bg-gradient-to-r ${themes[currentTheme]} text-white p-2 rounded-lg mr-3`}>
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SastaSmart</h3>
                  <div className="text-xs text-gray-500">Powered by AI • Made in India</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Your ultimate destination for automated deal discovery. Save money with AI-powered price comparison, 
                real-time alerts, and smart recommendations tailored just for you.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors">
                  📱 Telegram
                </button>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs transition-colors">
                  📢 Discord
                </button>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-xs transition-colors">
                  📸 Instagram
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors">
                  🎥 YouTube
                </button>
              </div>
              
              {/* App Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-bold text-lg text-green-600">{earnings.clicks}+</div>
                  <div className="text-xs text-gray-500">Daily Clicks</div>
                </div>
                <div>
                  <div className="font-bold text-lg text-blue-600">{shareCount}+</div>
                  <div className="text-xs text-gray-500">Shares</div>
                </div>
                <div>
                  <div className="font-bold text-lg text-purple-600">{products.length}+</div>
                  <div className="text-xs text-gray-500">Products</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-500 transition-colors flex items-center"><Zap className="w-3 h-3 mr-2" />Flash Deals</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors flex items-center"><TrendingUp className="w-3 h-3 mr-2" />Trending Products</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors flex items-center"><Bell className="w-3 h-3 mr-2" />Price Alerts</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors flex items-center"><Bookmark className="w-3 h-3 mr-2" />Wishlist</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors flex items-center"><BarChart3 className="w-3 h-3 mr-2" />Compare Prices</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors flex items-center"><Bot className="w-3 h-3 mr-2" />AI Assistant</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {categories.slice(1, 7).map(category => {
                  const IconComponent = category.icon;
                  return (
                    <li key={category.id}>
                      <a href="#" className="hover:text-blue-500 transition-colors flex items-center">
                        <IconComponent className="w-3 h-3 mr-2" />
                        {category.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Get notified about the best deals and exclusive offers.
              </p>
              <div className="flex mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
              
              {/* Live Status */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>{networkStatus ? 'Connected' : 'Offline Mode'}</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>AI-Powered Deals Active</span>
                </div>
                <div className="flex items-center space-x-2 text-yellow-600">
                  <Crown className="w-3 h-3" />
                  <span>Level {gamification.level} Hunter</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
              <span>© 2025 SastaSmart. All rights reserved.</span>
              <div className="flex items-center space-x-4 text-xs">
                <span className="flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  {earnings.clicks} deals clicked today
                </span>
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1 text-blue-500" />
                  {Math.floor(Math.random() * 1000) + 5000}+ active users
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-1 text-purple-500" />
                  ₹{Math.floor(earnings.revenue * 100)} saved today
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
              <button
                onClick={() => {
                  setLanguage(language === 'en' ? 'hi' : 'en');
                  showNotification(`Language changed to ${language === 'en' ? 'Hindi' : 'English'}`, 'info');
                }}
                className="hover:text-blue-500 transition-colors flex items-center"
              >
                <Globe className="w-4 h-4 mr-1" />
                {language === 'en' ? 'हिं' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 lg:hidden z-40">
        <div className="flex items-center justify-around py-2">
          <button 
            onClick={() => {
              setSelectedCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center p-2 ${selectedCategory === 'all' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button 
            onClick={() => {
              document.querySelector('input[placeholder="Search for products, brands, deals..."]')?.focus();
            }}
            className="flex flex-col items-center p-2 text-gray-500"
          >
            <Search className="w-5 h-5" />
            <span className="text-xs mt-1">Search</span>
          </button>
          
          <button 
            onClick={() => {
              const wishlistProducts = products.filter(p => wishlist.has(p.id));
              setFilteredProducts(wishlistProducts);
              showNotification(`Showing ${wishlistProducts.length} wishlist items`, 'info');
            }}
            className={`flex flex-col items-center p-2 relative ${wishlist.size > 0 ? 'text-yellow-500' : 'text-gray-500'}`}
          >
            <Bookmark className="w-5 h-5" />
            <span className="text-xs mt-1">Wishlist</span>
            {wishlist.size > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.size}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`flex flex-col items-center p-2 relative ${dealAlerts.length > 0 ? 'text-red-500' : 'text-gray-500'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs mt-1">Alerts</span>
            {dealAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {dealAlerts.length > 9 ? '9+' : dealAlerts.length}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => {
              showNotification(`Level ${gamification.level} Hunter with ${loyaltyPoints} points`, 'info');
            }}
            className="flex flex-col items-center p-2 text-gray-500 relative"
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full text-xs flex items-center justify-center text-white ${
              gamification.level >= 5 ? 'bg-purple-500' : gamification.level >= 3 ? 'bg-yellow-500' : 'bg-green-500'
            }`}>
              {gamification.level}
            </div>
          </button>
        </div>
      </div>

      {/* Accessibility Features */}
      {accessibilityMode && (
        <div className="fixed top-4 left-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-2 text-xs z-50">
          <div className="font-semibold text-yellow-800">Accessibility Mode Active</div>
          <div className="text-yellow-700">High contrast, larger text, reduced motion</div>
        </div>
      )}

      {/* Emergency Mode Overlay */}
      {emergencyMode && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-2 text-center text-sm font-semibold z-50 animate-pulse">
          <AlertTriangle className="w-4 h-4 inline mr-2" />
          EMERGENCY MODE: Simplified interface for urgent purchases
          <button 
            onClick={toggleEmergencyMode}
            className="ml-4 bg-white text-red-500 px-2 py-1 rounded text-xs"
          >
            Exit
          </button>
        </div>
      )}

      {/* Performance Monitoring */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black text-white p-2 rounded text-xs font-mono z-50">
          <div>Screen Time: {Math.floor(screenTime / 60)}:{String(screenTime % 60).padStart(2, '0')}</div>
          <div>Battery: {Math.floor(batteryLevel)}%</div>
          <div>Network: {networkStatus ? 'Online' : 'Offline'}</div>
          <div>Products: {filteredProducts.length}/{products.length}</div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        .dark ::-webkit-scrollbar-track {
          background: #374151;
        }
        
        .dark ::-webkit-scrollbar-thumb {
          background: #6b7280;
        }
        
        .dark ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default SastaSmart;