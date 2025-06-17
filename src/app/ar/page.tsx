'use client'

import { useSearchParams } from 'next/navigation'
import ARViewer from '@/components/ar-viewer'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ARPage() {
  const searchParams = useSearchParams()
  const productName = searchParams.get('product') || 'Modern Comfort Sofa'
  const glbUrl = searchParams.get('glb') || '/assets/sofa.glb'
  const usdzUrl = searchParams.get('usdz') || '/assets/sofa.usdz'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="icon" className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-lg font-semibold text-gray-900">AR View</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{productName}</h1>
          <p className="text-gray-600">Experience this furniture in augmented reality</p>
        </div>

        {/* AR Viewer */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="max-w-md mx-auto">
            <ARViewer 
              glbUrl={glbUrl} 
              usdzUrl={usdzUrl}
              className="w-full"
            />
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">How to use AR</h3>
            <div className="space-y-3 text-sm text-blue-800">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">1</div>
                <p>Tap the "View in AR" button above</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</div>
                <p>Allow camera access when prompted</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">3</div>
                <p>Point your camera at a flat surface and tap to place the furniture</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">4</div>
                <p>Walk around to see the furniture from different angles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Device Requirements */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Device Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">iOS Devices</h4>
              <ul className="space-y-1">
                <li>• iPhone 6s or newer</li>
                <li>• iPad (5th generation) or newer</li>
                <li>• iOS 11 or later</li>
                <li>• Safari browser</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Android Devices</h4>
              <ul className="space-y-1">
                <li>• ARCore compatible device</li>
                <li>• Android 7.0 or later</li>
                <li>• Chrome browser</li>
                <li>• Google Play Services for AR</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 