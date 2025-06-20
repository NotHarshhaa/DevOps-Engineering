'use client'

import Image from 'next/image'
import { useState } from 'react'

const UPIQRCode = () => {
  const upiId = 'harshhaahdfc@ibl'
  const whatsappNumber = '917995905634'
  // Using QR Server API for better reliability
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(upiId)}&pn=HARSHHAA&bgcolor=FFFFFF`
  const [copyStatus, setCopyStatus] = useState('')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus(''), 2000)
    } catch (err) {
      setCopyStatus('Failed to copy')
      setTimeout(() => setCopyStatus(''), 2000)
    }
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi, I have made the payment for Premium Plan. Here is my payment screenshot.')
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-all">
      {/* QR Code Section */}
      <div className="bg-white rounded-lg w-[200px] h-[200px] flex-shrink-0 flex items-center justify-center">
        <div className="relative w-[180px] h-[180px] flex items-center justify-center">
          <Image
            src={qrCodeUrl}
            alt="UPI QR Code"
            fill
            className="object-contain"
            priority
            sizes="180px"
          />
        </div>
      </div>

      {/* Controls Section */}
      <div className="w-full md:w-[280px] space-y-3">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center md:text-left">
          Scan to Pay
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 bg-gray-100/80 dark:bg-gray-800/80 rounded-lg">
            <p className="font-mono text-xs text-gray-700 dark:text-gray-300 truncate">
              {upiId}
            </p>
          </div>
          <button 
            onClick={handleCopy}
            className={`min-w-[52px] px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              copyStatus === 'Copied!' 
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : copyStatus === 'Failed to copy'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            aria-label="Copy UPI ID"
          >
            {copyStatus || 'Copy'}
          </button>
        </div>
        <button
          onClick={handleWhatsAppClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#22c55e] text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Send Payment Screenshot
        </button>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center md:text-left">
          UPI ID
        </p>
      </div>
    </div>
  )
}

export default UPIQRCode 