'use client'

import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { Copy, Check, ExternalLink, Wallet, List, ToggleLeft, ToggleRight } from 'lucide-react'

interface DeepLink {
  title: string
  path: string
  description: string
  symbol?: string
  category: 'navigation' | 'asset'
  isNew?: boolean
  icon: 'wallet' | 'list' | 'asset'
}

interface Environment {
  name: string
  domain: string
  altDomain?: string
}

const environments: Environment[] = [
  {
    name: 'Production',
    domain: 'https://link.metamask.io',
    altDomain: 'https://metamask.app.link'
  },
  {
    name: 'Development',
    domain: 'https://link-test.metamask.io',
    altDomain: 'https://metamask.test-app.link'
  }
]

const deepLinksConfig: DeepLink[] = [
  {
    title: 'Perps Wallet Tab',
    path: '/perps',
    description: 'Opens wallet home with Perps tab selected',
    category: 'navigation',
    icon: 'wallet'
  },
  {
    title: 'Perps Markets List',
    path: '/perps?screen=markets',
    description: 'Direct access to markets list (returning users) or tutorial (first-time users)',
    category: 'navigation',
    icon: 'list',
    isNew: true
  },
  {
    title: 'BTC Perps',
    path: '/perps-asset?symbol=BTC',
    description: 'Opens Bitcoin perpetual trading',
    symbol: 'BTC',
    category: 'asset',
    icon: 'asset'
  },
  {
    title: 'ETH Perps',
    path: '/perps-asset?symbol=ETH',
    description: 'Opens Ethereum perpetual trading',
    symbol: 'ETH',
    category: 'asset',
    icon: 'asset'
  },
  {
    title: 'SOL Perps',
    path: '/perps-asset?symbol=SOL',
    description: 'Opens Solana perpetual trading',
    symbol: 'SOL',
    category: 'asset',
    icon: 'asset'
  }
]

export default function Home() {
  const [qrCodes, setQrCodes] = useState<{ [key: string]: string }>({})
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [selectedEnvironment, setSelectedEnvironment] = useState(0) // 0 = Production, 1 = Development
  const [deepLinks, setDeepLinks] = useState<(DeepLink & { url: string })[]>([])

  useEffect(() => {
    // Load environment preference from localStorage
    const saved = localStorage.getItem('metamask-deeplinks-env')
    if (saved) {
      setSelectedEnvironment(parseInt(saved))
    }
  }, [])

  useEffect(() => {
    // Generate deep links with current environment
    const currentEnv = environments[selectedEnvironment]
    const links = deepLinksConfig.map(link => ({
      ...link,
      url: `${currentEnv.domain}${link.path}`
    }))
    setDeepLinks(links)
  }, [selectedEnvironment])

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

    if (deepLinks.length > 0) {
      generateQRCodes()
    }
  }, [deepLinks])

  const handleCopy = async (url: string, index: number) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const toggleEnvironment = () => {
    const newEnv = selectedEnvironment === 0 ? 1 : 0
    setSelectedEnvironment(newEnv)
    localStorage.setItem('metamask-deeplinks-env', newEnv.toString())
  }

  const getIconForLink = (iconType: 'wallet' | 'list' | 'asset') => {
    switch (iconType) {
      case 'wallet':
        return <Wallet className="w-5 h-5" />
      case 'list':
        return <List className="w-5 h-5" />
      case 'asset':
        return <ExternalLink className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: 'navigation' | 'asset') => {
    return category === 'navigation' 
      ? 'bg-blue-50 border-blue-200' 
      : 'bg-green-50 border-green-200'
  }

  const getCategoryIconColor = (category: 'navigation' | 'asset') => {
    return category === 'navigation' 
      ? 'text-blue-600' 
      : 'text-green-600'
  }

  const getCategoryButtonColor = (category: 'navigation' | 'asset') => {
    return category === 'navigation' 
      ? 'bg-blue-600 hover:bg-blue-700' 
      : 'bg-green-600 hover:bg-green-700'
  }

  const navigationLinks = deepLinks.filter(link => link.category === 'navigation')
  const assetLinks = deepLinks.filter(link => link.category === 'asset')

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MetaMask Perps Deep Links Tester
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Test deep links for MetaMask Mobile perpetuals trading feature.
            Scan QR codes with your mobile device or copy links for testing.
          </p>

          {/* Environment Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Environment:</span>
            <button
              onClick={toggleEnvironment}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {selectedEnvironment === 0 ? (
                <ToggleRight className="w-5 h-5 text-green-600" />
              ) : (
                <ToggleLeft className="w-5 h-5 text-gray-400" />
              )}
              <span className="font-semibold">
                {environments[selectedEnvironment].name}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                ({environments[selectedEnvironment].domain.replace('https://', '')})
              </span>
            </button>
          </div>

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

        {/* Smart Routing Info */}
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">📱 Smart Routing Behavior</h3>
          <div className="space-y-2 text-sm text-amber-700">
            <p><strong>First-time users:</strong> All perps links redirect to tutorial for proper onboarding</p>
            <p><strong>Returning users:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><code>/perps</code> → Opens wallet home with Perps tab selected</li>
              <li><code>/perps?screen=markets</code> → Direct access to markets list view</li>
              <li><code>/perps-asset?symbol=X</code> → Opens specific asset trading page</li>
            </ul>
          </div>
        </div>

        {/* Navigation Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-blue-600" />
            Navigation Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {navigationLinks.map((link, index) => (
              <div
                key={`nav-${index}`}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 ${getCategoryColor(link.category)}`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={getCategoryIconColor(link.category)}>
                      {getIconForLink(link.icon)}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {link.title}
                    </h3>
                    {link.isNew && (
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                        NEW
                      </span>
                    )}
                  </div>
                  
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
                      className={`block w-full text-center py-2 text-white rounded-lg transition-colors font-medium ${getCategoryButtonColor(link.category)}`}
                    >
                      Open Link
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Asset-Specific Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ExternalLink className="w-6 h-6 text-green-600" />
            Asset-Specific Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assetLinks.map((link, index) => (
              <div
                key={`asset-${index}`}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 ${getCategoryColor(link.category)}`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={getCategoryIconColor(link.category)}>
                      {getIconForLink(link.icon)}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {link.title}
                    </h3>
                  </div>

                  {link.symbol && (
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-3">
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
                        onClick={() => handleCopy(link.url, navigationLinks.length + index)}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        title="Copy URL"
                      >
                        {copiedIndex === (navigationLinks.length + index) ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    
                    <a
                      href={link.url}
                      className={`block w-full text-center py-2 text-white rounded-lg transition-colors font-medium ${getCategoryButtonColor(link.category)}`}
                    >
                      Open Link
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Testing Instructions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📱 Mobile Testing</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Toggle environment above to switch between Production and Development URLs</li>
                <li>Open this page on your mobile device or scan a QR code</li>
                <li>Ensure MetaMask Mobile is installed (debug build for Development, production for Production)</li>
                <li>Tap &quot;Open Link&quot; or scan the QR code</li>
                <li>MetaMask should open to the specific perps page</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🖥️ iOS Simulator</h3>
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-600">Production URLs:</h4>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Navigation links
xcrun simctl openurl booted "${environments[0].domain}/perps"
xcrun simctl openurl booted "${environments[0].domain}/perps?screen=markets"

# Asset-specific links
xcrun simctl openurl booted "${environments[0].domain}/perps-asset?symbol=BTC"
xcrun simctl openurl booted "${environments[0].domain}/perps-asset?symbol=ETH"
xcrun simctl openurl booted "${environments[0].domain}/perps-asset?symbol=SOL"`}
                </pre>

                <h4 className="font-semibold text-amber-600">Development URLs:</h4>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Navigation links
xcrun simctl openurl booted "${environments[1].domain}/perps"
xcrun simctl openurl booted "${environments[1].domain}/perps?screen=markets"

# Asset-specific links
xcrun simctl openurl booted "${environments[1].domain}/perps-asset?symbol=BTC"
xcrun simctl openurl booted "${environments[1].domain}/perps-asset?symbol=ETH"
xcrun simctl openurl booted "${environments[1].domain}/perps-asset?symbol=SOL"`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🤖 Android Testing</h3>
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-600">Production URLs:</h4>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Navigation links
adb shell am start -W -a android.intent.action.VIEW \\
  -d "${environments[0].domain}/perps" io.metamask

adb shell am start -W -a android.intent.action.VIEW \\
  -d "${environments[0].domain}/perps?screen=markets" io.metamask

# Asset-specific links
adb shell am start -W -a android.intent.action.VIEW \\
  -d "${environments[0].domain}/perps-asset?symbol=BTC" io.metamask`}
                </pre>

                <h4 className="font-semibold text-amber-600">Development URLs:</h4>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Navigation links
adb shell am start -W -a android.intent.action.VIEW \\
  -d "${environments[1].domain}/perps" io.metamask.debug

adb shell am start -W -a android.intent.action.VIEW \\
  -d "${environments[1].domain}/perps?screen=markets" io.metamask.debug

# Asset-specific links
adb shell am start -W -a android.intent.action.VIEW \\
  -d "${environments[1].domain}/perps-asset?symbol=BTC" io.metamask.debug`}
                </pre>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Alternative Domains:</h4>
              <p className="text-sm text-blue-700 mb-2">You can also test with these alternative domains:</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li><strong>Production:</strong> <code>{environments[0].altDomain}</code></li>
                <li><strong>Development:</strong> <code>{environments[1].altDomain}</code></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
