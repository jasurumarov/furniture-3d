'use client'

import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { Button } from '@/components/ui/button'
import { X, Download, Smartphone } from 'lucide-react'

interface QRCodeGeneratorProps {
  url: string
  title?: string
  onClose: () => void
  isOpen: boolean
}

export default function QRCodeGenerator({ url, title = "AR View", onClose, isOpen }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string>('')

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      .then(() => {
        // Convert canvas to data URL for download
        if (canvasRef.current) {
          setQrDataUrl(canvasRef.current.toDataURL('image/png'))
        }
      })
      .catch((error) => {
        console.error('Error generating QR code:', error)
      })
    }
  }, [url, isOpen])

  const downloadQRCode = () => {
    if (qrDataUrl) {
      const a = document.createElement('a')
      a.href = qrDataUrl
      a.download = 'ar-qr-code.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Scan to View in AR</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">
              Scan this QR code with your mobile device to view the furniture in AR
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-lg shadow-inner border-2 border-gray-100">
              <canvas 
                ref={canvasRef}
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-left space-y-2 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">1</div>
                <p>Open your phone's camera app</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</div>
                <p>Point the camera at the QR code</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">3</div>
                <p>Tap the notification that appears</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">4</div>
                <p>Your phone will open the AR experience</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={downloadQRCode} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download QR
            </Button>
            <Button onClick={onClose} className="flex-1">
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 