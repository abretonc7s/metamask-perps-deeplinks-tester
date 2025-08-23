'use client'

import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { Copy, Check, ExternalLink } from 'lucide-react'

interface DeepLink {
  title: string
  url: string
  description: string
  symbol?: string
}

const deepLinks: DeepLink[] = [
  {
    title: 'Perps Market Overview',
    url: 'https://link-test.metamask.io/perps',
    description: 'Opens the main perpetuals market overview'
  },
  {
    title: 'BTC Perps',
    url: 'https://link-test.metamask.io/perps-asset?symbol=BTC',
    description: 'Opens Bitcoin perpetual trading',
    symbol: 'BTC'
  },
  {
    title: 'ETH Perps',
    url: 'https://link-test.metamask.io/perps-asset?symbol=ETH',
    description: 'Opens Ethereum perpetual trading',
    symbol: 'ETH'
  },
  {
    title: 'SOL Perps',
    url: 'https://link-test.metamask.io/perps-asset?symbol=SOL',
    description: 'Opens Solana perpetual trading',
    symbol: 'SOL'
  }
]

export default function Home() {
  const [qrCodes, setQrCodes] = useState<{ [key: string]: string }>({})
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    const generateQRCodes = async () => {
      const codes: { [key: string]: string } = {}
      for (const link of deepLinks) {
        try {
          const qrDataUrl = await QRCode.toDataURL(link.url, {
            width: 200,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          })
          codes[link.url] = qrDataUrl
        } catch (err) {
          console.error('Error generating QR code:', err)
        }
      }
      setQrCodes(codes)
    }

    generateQRCodes()
  }, [])

  const handleCopy = async (url: string, index: number) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MetaMask Perps Deep Links Tester
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Test deep links for MetaMask Mobile perpetuals trading feature.
            Scan QR codes with your mobile device or copy links for testing.
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/MetaMask/metamask-mobile/pull/18568"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View PR #18568
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deepLinks.map((link, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {link.title}
                </h2>
                {link.symbol && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
                    {link.symbol}
                  </span>
                )}
                <p className="text-gray-600 text-sm text-center mb-4">
                  {link.description}
                </p>
                
                {qrCodes[link.url] && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrCodes[link.url]}
                      alt={`QR Code for ${link.title}`}
                      className="w-48 h-48"
                    />
                  </div>
                )}
                
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      value={link.url}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-mono"
                    />
                    <button
                      onClick={() => handleCopy(link.url, index)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      title="Copy URL"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  <a
                    href={link.url}
                    className="block w-full text-center py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors font-medium"
                  >
                    Open Link
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Testing Instructions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📱 Mobile Testing</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Open this page on your mobile device or scan a QR code</li>
                <li>Ensure MetaMask Mobile is installed (debug build for testing)</li>
                <li>Tap &quot;Open Link&quot; or scan the QR code</li>
                <li>MetaMask should open to the specific perps page</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🖥️ iOS Simulator</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Market overview
xcrun simctl openurl booted "https://link-test.metamask.io/perps"

# Specific assets
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=BTC"
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=ETH"
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=SOL"`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🤖 Android Testing</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Market overview
adb shell am start -W -a android.intent.action.VIEW \\
  -d "https://link-test.metamask.io/perps" io.metamask.debug

# Specific assets
adb shell am start -W -a android.intent.action.VIEW \\
  -d "https://link-test.metamask.io/perps-asset?symbol=BTC" io.metamask.debug`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
