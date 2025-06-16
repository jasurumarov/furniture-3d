'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ThreeDViewer from '@/components/3d-viewer'
import ARViewer from '@/components/ar-viewer'
import { 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw, 
  Star,
  ChevronLeft,
  Palette,
  Ruler,
  Package
} from 'lucide-react'

export default function FurnitureDetail() {
  const [selectedColor, setSelectedColor] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('3d')

  const productData = {
    name: "Modern Comfort Sofa",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 124,
    description: "Experience ultimate comfort with our Modern Comfort Sofa. Crafted with premium materials and contemporary design, this sofa combines style and functionality to elevate your living space.",
    features: [
      "Premium fabric upholstery",
      "Solid hardwood frame", 
      "High-density foam cushions",
      "Removable cushion covers",
      "Easy assembly"
    ],
    specifications: {
      dimensions: "84\" W × 36\" D × 32\" H",
      weight: "95 lbs",
      material: "Fabric, Hardwood, Foam",
      color: "Charcoal Gray",
      warranty: "5 years"
    },
    colors: [
      { name: "Charcoal Gray", value: "#4A5568" },
      { name: "Navy Blue", value: "#2D3748" },
      { name: "Cream", value: "#F7FAFC" },
      { name: "Brown", value: "#744210" }
    ]
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productData.name,
          text: productData.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">Furniture Detail</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={isWishlisted ? "text-red-500" : "text-gray-500"}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Viewer Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('3d')}
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    activeTab === '3d'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  3D View
                </button>
                <button
                  onClick={() => setActiveTab('ar')}
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    activeTab === 'ar'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  AR View
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === '3d' ? (
                  <div className="h-96">
                    <ThreeDViewer modelUrl="/assets/sofa.glb" />
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <ARViewer 
                      glbUrl="/assets/sofa.glb" 
                      usdzUrl="/assets/sofa.usdz"
                      className="w-full max-w-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 3D Controls Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">3D Controls</h3>
              <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                <div className="text-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <p>Rotate</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
                    <Package className="w-4 h-4" />
                  </div>
                  <p>Pan</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <p>Zoom</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">New Arrival</Badge>
                <Badge variant="outline">Free Shipping</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{productData.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(productData.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {productData.rating} ({productData.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">${productData.price}</span>
                <span className="text-xl text-gray-500 line-through">${productData.originalPrice}</span>
                <Badge variant="destructive">Save ${productData.originalPrice - productData.price}</Badge>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Color
              </h3>
              <div className="flex space-x-3">
                {productData.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor === index ? 'border-gray-900' : 'border-gray-300'
                    } relative`}
                    style={{ backgroundColor: color.value }}
                  >
                    {selectedColor === index && (
                      <div className="absolute inset-0 rounded-full border-2 border-white"></div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Selected: {productData.colors[selectedColor].name}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{productData.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {Object.entries(productData.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg">
                Add to Cart - ${productData.price}
              </Button>
              <Button variant="outline" className="w-full font-semibold py-3">
                Buy Now
              </Button>
            </div>

            {/* Shipping & Returns */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                    <p className="text-xs text-gray-600">Orders over $500</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">5 Year Warranty</p>
                    <p className="text-xs text-gray-600">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                    <p className="text-xs text-gray-600">30 day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 