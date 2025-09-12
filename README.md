# MetaMask Perps Deep Links Tester

A comprehensive web application for testing MetaMask Mobile perpetuals trading deep links with unified routing architecture. This tool generates QR codes and provides easy access to test deep links for the perps feature with the new unified parameter-based structure.

## Features

- **Environment Toggle**: Switch between Production and Development deep link domains
- **Unified Deeplink Structure**: All perps links now use single `/perps` entry point with `screen` parameter
- **QR Code Generation**: Automatic QR codes for each deep link for easy mobile scanning
- **Smart Routing Support**: Test the parameter-based navigation system
- **Copy-to-clipboard**: One-click copying for all deep links
- **Visual Categorization**: Clear separation between navigation options and asset trading
- **Comprehensive Testing Instructions**: Commands for iOS, Android, and mobile testing
- **Clean, responsive interface** optimized for both desktop and mobile devices

## Unified Deeplink Structure

All perps deeplinks now use a single unified entry point: `/perps`

Navigation is controlled via the `screen` parameter:
- `/perps` → Default wallet home with Perps tab
- `/perps?screen=tabs` → Explicit wallet home with Perps tab  
- `/perps?screen=markets` → Direct access to markets list
- `/perps?screen=asset&symbol=BTC` → Asset-specific trading pages

## Deep Links Supported

### Navigation Options
- **Perps Wallet Tab (Implicit)**: Default behavior
  - Production: `https://link.metamask.io/perps`
  - Development: `https://link-test.metamask.io/perps`

- **Perps Wallet Tab (Explicit)**: Explicit parameter
  - Production: `https://link.metamask.io/perps?screen=tabs`
  - Development: `https://link-test.metamask.io/perps?screen=tabs`
  
- **Perps Markets List**: Direct access to markets list
  - Production: `https://link.metamask.io/perps?screen=markets`
  - Development: `https://link-test.metamask.io/perps?screen=markets`

### Asset Trading Links
- **BTC Asset Trading**: `screen=asset&symbol=BTC`
- **ETH Asset Trading**: `screen=asset&symbol=ETH`  
- **SOL Asset Trading**: `screen=asset&symbol=SOL`

## Smart Routing Behavior

The unified deep links include smart routing functionality:

- **First-time users**: All perps links redirect to tutorial for proper onboarding
- **Returning users are routed based on the screen parameter**:
  - No parameter or `screen=tabs` → Wallet home with Perps tab
  - `screen=markets` → Direct access to markets list view
  - `screen=asset&symbol=X` → Specific asset trading page

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
# Navigation options
xcrun simctl openurl booted "https://link.metamask.io/perps"
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=tabs"
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=markets"

# Asset trading
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=asset&symbol=BTC"
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=asset&symbol=ETH"
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=asset&symbol=SOL"
```

#### Development URLs
```bash
# Navigation options
xcrun simctl openurl booted "https://link-test.metamask.io/perps"
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=tabs"
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=markets"

# Asset trading
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=asset&symbol=BTC"
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=asset&symbol=ETH"
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=asset&symbol=SOL"
```

### Android

#### Production URLs
```bash
# Navigation options
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps" io.metamask

adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps?screen=tabs" io.metamask

adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps?screen=markets" io.metamask

# Asset trading
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps?screen=asset&symbol=BTC" io.metamask
```

#### Development URLs
```bash
# Navigation options
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps" io.metamask.debug

adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps?screen=tabs" io.metamask.debug

adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps?screen=markets" io.metamask.debug

# Asset trading
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps?screen=asset&symbol=BTC" io.metamask.debug
```

### Manual Testing Scenarios

Test the unified deeplink structure and smart routing with these scenarios:

1. **First-time user testing**: All perps URLs should redirect to tutorial regardless of parameters
2. **Returning user - Default Navigation**: `/perps` should open wallet home with perps tab
3. **Returning user - Explicit Navigation**: `/perps?screen=tabs` should open wallet home with perps tab  
4. **Returning user - Markets List**: `/perps?screen=markets` should open markets list directly
5. **Asset-specific**: All `/perps?screen=asset&symbol=X` should open specific asset trading pages
6. **Parameter parsing**: Test malformed parameters and edge cases
7. **Invalid symbols**: Test with unsupported asset symbols

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
