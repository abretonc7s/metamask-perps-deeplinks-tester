# MetaMask Perps Deep Links Tester

A comprehensive web application for testing MetaMask Mobile perpetuals trading deep links with smart routing functionality. This tool generates QR codes and provides easy access to test deep links for the perps feature ([PR #18568](https://github.com/MetaMask/metamask-mobile/pull/18568)).

## Features

- **Environment Toggle**: Switch between Production and Development deep link domains
- **QR Code Generation**: Automatic QR codes for each deep link for easy mobile scanning
- **Smart Routing Support**: Test the new markets screen parameter functionality
- **Copy-to-clipboard**: One-click copying for all deep links
- **Visual Differentiation**: Clear categorization between navigation and asset-specific links
- **Comprehensive Testing Instructions**: Commands for iOS, Android, and mobile testing
- **Clean, responsive interface** optimized for both desktop and mobile devices

## Deep Links Supported

### Navigation Links
- **Perps Wallet Tab**: Opens wallet home with Perps tab selected
  - Production: `https://link.metamask.io/perps`
  - Development: `https://link-test.metamask.io/perps`
  
- **Perps Markets List**: Direct access to markets list (NEW - with smart routing)
  - Production: `https://link.metamask.io/perps?screen=markets`
  - Development: `https://link-test.metamask.io/perps?screen=markets`

### Asset-Specific Links
- **BTC Perps**: Opens Bitcoin perpetual trading
- **ETH Perps**: Opens Ethereum perpetual trading  
- **SOL Perps**: Opens Solana perpetual trading

## Smart Routing Behavior

The enhanced deep links now include smart routing functionality:

- **First-time users**: All perps links redirect to tutorial for proper onboarding
- **Returning users**:
  - `/perps` → Opens wallet home with Perps tab selected
  - `/perps?screen=markets` → Direct access to markets list view
  - `/perps-asset?symbol=X` → Opens specific asset trading page

## Supported Domains

### Production
- Primary: `link.metamask.io`
- Alternative: `metamask.app.link`

### Development
- Primary: `link-test.metamask.io`
- Alternative: `metamask.test-app.link`

## Local Development

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing on Mobile

1. Make sure your mobile device is on the same network as your development machine
2. Find your machine's local IP address:
   - Mac: `ifconfig | grep inet`
   - Windows: `ipconfig`
3. Open `http://[YOUR_IP]:3000` on your mobile device
4. Scan QR codes or tap links to test with MetaMask Mobile

## Deployment

This project is configured for easy deployment with Vercel:

1. Push your code to a GitHub repository
2. Import the project in [Vercel](https://vercel.com/new)
3. Deploy with default settings (no configuration needed)

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Testing Instructions

### iOS Simulator

#### Production URLs
```bash
# Navigation links
xcrun simctl openurl booted "https://link.metamask.io/perps"
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=markets"

# Asset-specific links
xcrun simctl openurl booted "https://link.metamask.io/perps-asset?symbol=BTC"
xcrun simctl openurl booted "https://link.metamask.io/perps-asset?symbol=ETH"
xcrun simctl openurl booted "https://link.metamask.io/perps-asset?symbol=SOL"
```

#### Development URLs
```bash
# Navigation links
xcrun simctl openurl booted "https://link-test.metamask.io/perps"
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=markets"

# Asset-specific links
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=BTC"
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=ETH"
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=SOL"
```

### Android

#### Production URLs
```bash
# Navigation links
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps" io.metamask

adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps?screen=markets" io.metamask

# Asset-specific links
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps-asset?symbol=BTC" io.metamask
```

#### Development URLs
```bash
# Navigation links
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps" io.metamask.debug

adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps?screen=markets" io.metamask.debug

# Asset-specific links
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps-asset?symbol=BTC" io.metamask.debug
```

### Manual Testing Scenarios

Test the smart routing behavior with these scenarios:

1. **First-time user testing**: All perps URLs should redirect to tutorial
2. **Returning user - Wallet Tab**: `/perps` should open wallet home with perps tab
3. **Returning user - Markets List**: `/perps?screen=markets` should open markets list directly
4. **Asset-specific**: All `/perps-asset?symbol=X` should open specific asset pages

### Alternative Domain Testing

You can also test with alternative domains:
- Production: `https://metamask.app.link/perps`
- Development: `https://metamask.test-app.link/perps`

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- QRCode library for QR generation

## License

MIT
