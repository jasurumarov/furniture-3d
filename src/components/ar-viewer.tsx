'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Smartphone, Eye } from 'lucide-react'

// Declare model-viewer as a custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any
    }
  }
}

interface ARViewerProps {
  glbUrl: string
  usdzUrl: string
  className?: string
}

export default function ARViewer({ glbUrl, usdzUrl, className = "" }: ARViewerProps) {
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
    const isAndroidDevice = /android/.test(userAgent)
    const isMobileDevice = isIOSDevice || isAndroidDevice

    setIsIOS(isIOSDevice)
    setIsAndroid(isAndroidDevice)
    setIsMobile(isMobileDevice)

    // Load model-viewer script
    if (typeof window !== 'undefined' && !window.customElements.get('model-viewer')) {
      import('@google/model-viewer')
    }
  }, [])

  const handleARView = () => {
    if (isIOS) {
      // iOS uses USDZ format with AR Quick Look
      const link = document.createElement('a')
      link.href = usdzUrl
      link.rel = 'ar'
      link.appendChild(document.createElement('img'))
      link.click()
    } else if (isAndroid) {
      // For Android, we'll show the model-viewer with AR button
      window.open(`data:text/html,
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>AR View</title>
          <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
          <style>
            body { margin: 0; padding: 0; background: #000; }
            model-viewer { width: 100vw; height: 100vh; }
            .close-btn { position: absolute; top: 20px; right: 20px; background: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; z-index: 1000; }
          </style>
        </head>
        <body>
          <button class="close-btn" onclick="window.close()">×</button>
          <model-viewer 
            src="${glbUrl}" 
            ar 
            ar-modes="webxr scene-viewer quick-look" 
            camera-controls 
            shadow-intensity="1" 
            auto-rotate>
          </model-viewer>
        </body>
        </html>
      `, '_blank')
    }
  }

  if (!isMobile) {
    return (
      <div className={`flex items-center justify-center p-4 bg-gray-50 rounded-lg ${className}`}>
        <div className="text-center text-gray-500">
          <Smartphone className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">AR viewing is available on mobile devices</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <Button
        onClick={handleARView}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
        size="lg"
      >
        <Eye className="w-5 h-5 mr-2" />
        View in AR
      </Button>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        {isIOS ? 'Uses AR Quick Look' : 'Uses WebXR/Scene Viewer'}
      </p>
    </div>
  )
} 