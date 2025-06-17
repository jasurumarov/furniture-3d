'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Smartphone, Eye, QrCode } from 'lucide-react'
import QRCodeGenerator from './qr-code-generator'

interface ARViewerProps {
  glbUrl: string
  usdzUrl: string
  className?: string
}

export default function ARViewer({ glbUrl, usdzUrl, className = "" }: ARViewerProps) {
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
    const isAndroidDevice = /android/.test(userAgent)
    const isMobileDevice = isIOSDevice || isAndroidDevice

    setIsIOS(isIOSDevice)
    setIsAndroid(isAndroidDevice)
    setIsMobile(isMobileDevice)
  }, [])

  const handleARView = () => {
    if (isIOS) {
      // iOS uses USDZ format with AR Quick Look
      // Create a proper AR Quick Look link
      const link = document.createElement('a')
      link.href = usdzUrl
      link.rel = 'ar'
      
      // Add required attributes for iOS AR Quick Look
      const img = document.createElement('img')
      img.src = '/assets/sofa-preview.png' // Fallback image (you may want to add this)
      img.alt = 'AR Preview'
      link.appendChild(img)
      
      // Ensure proper MIME type handling
      link.setAttribute('download', 'sofa.usdz')
      
      // Trigger the download/AR view
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else if (isAndroid) {
      // For Android, try to open with Scene Viewer (Google's AR viewer)
      const sceneViewerUrl = `https://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(window.location.origin + glbUrl)}&mode=ar_only`
      
      // Try Scene Viewer first
      window.open(sceneViewerUrl, '_blank')
      
      // Fallback: Show instructions for manual AR viewing
      setTimeout(() => {
        alert('If AR didn\'t open automatically, you can:\n1. Download the GLB file\n2. Open it with a compatible AR app\n3. Or visit the model URL directly in Chrome on Android')
      }, 2000)
    }
  }

  const generateARUrl = () => {
    const baseUrl = window.location.origin
    const arUrl = new URL('/ar', baseUrl)
    arUrl.searchParams.set('product', 'Modern Comfort Sofa')
    arUrl.searchParams.set('glb', glbUrl)
    arUrl.searchParams.set('usdz', usdzUrl)
    return arUrl.toString()
  }

  const handleQRCodeView = () => {
    setShowQRCode(true)
  }

  if (!isMobile) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">View in AR on Mobile</h3>
            <p className="text-sm text-gray-600 mb-6">
              Generate a QR code to scan with your mobile device for AR viewing
            </p>
            
            <Button
              onClick={handleQRCodeView}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
              size="lg"
            >
              <QrCode className="w-5 h-5 mr-2" />
              Generate QR Code
            </Button>
          </div>
        </div>

        <QRCodeGenerator
          url={generateARUrl()}
          title="Modern Comfort Sofa - AR View"
          isOpen={showQRCode}
          onClose={() => setShowQRCode(false)}
        />
      </div>
    )
  }

  return (
    <div className={className}>
      {isIOS ? (
        // Use a proper anchor tag for iOS AR Quick Look
        <a
          href={usdzUrl}
          rel="ar"
          className="block w-full"
        >
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <Eye className="w-5 h-5 mr-2" />
            View in AR
          </Button>
        </a>
      ) : (
        <Button
          onClick={handleARView}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          size="lg"
        >
          <Eye className="w-5 h-5 mr-2" />
          View in AR
        </Button>
      )}
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        {isIOS ? 'Uses AR Quick Look' : 'Uses WebXR/Scene Viewer'}
      </p>
    </div>
  )
} 