# MetaMask Perps Deep Links Tester

A comprehensive web application for testing MetaMask Mobile perpetuals trading deep links with unified routing architecture. This tool generates QR codes and provides easy access to test deep links for the perps feature with the new unified parameter-based structure.

## Features

- **Environment Toggle**: Switch between Production and Development deep link domains
- **Unified Deeplink Structure**: All perps links now use single `/perps` entry point with `screen` parameter
- **QR Code Generation**: Automatic QR codes for each deep link for easy mobile scanning
- **Smart Routing Support**: Test the parameter-based navigation system
- **Copy-to-clipboard**: One-click copying for all deep links
- **Visual Categorization**: Clear separation between navigation, market list, and asset trading
- **Comprehensive Testing Instructions**: Commands for iOS, Android, and mobile testing
- **Clean, responsive interface** optimized for both desktop and mobile devices

## Unified Deeplink Structure

All perps deeplinks use a single unified entry point: `/perps`

### Screen Parameter Values

| Screen Value | Target View | Description |
|-------------|-------------|-------------|
| (none) | Wallet Home → Perps Tab | Default behavior |
| `tabs` | Wallet Home → Perps Tab | Explicit wallet tab navigation |
| `home` | PerpsHomeView | Landing page (positions, orders, watchlist) |
| `markets` | PerpsHomeView | Backwards compatibility - same as `home` |
| `market-list` | PerpsMarketListView | Full market browser with search/filter |
| `asset` | PerpsMarketDetailsView | Single market detail + TradingView chart |

### Tab Parameter (for market-list)

| Value | Description | Internal Filter |
|-------|-------------|-----------------|
| `all` | All markets (crypto + stocks + commodities) | `'all'` |
| `crypto` | Crypto-only markets | `'crypto'` |
| `stocks` | Stocks and commodities (HIP-3 markets) | `'stocks_and_commodities'` |

### HIP-3 Symbol Format

HIP-3 (builder-deployed DEX) markets use the format `dex:symbol`:

| Symbol | Description |
|--------|-------------|
| `BTC` | Standard crypto (main DEX) |
| `xyz:TSLA` | HIP-3 stock (Tesla via xyz DEX) |
| `xyz:xyz100` | HIP-3 index asset |

## Deep Links Supported

### Navigation Options

- **Perps Wallet Tab (Default)**: Opens wallet home with Perps tab
  - `/perps`

- **Perps Wallet Tab (Explicit)**: Explicit screen parameter
  - `/perps?screen=tabs`

- **Perps Home View**: Direct navigation to PerpsHomeView
  - `/perps?screen=home`

- **Perps Home (Backwards Compat)**: Same as home
  - `/perps?screen=markets`

### Market List Links

- **All Markets**: Full market browser
  - `/perps?screen=market-list`

- **Crypto Markets Only**: Filtered to crypto
  - `/perps?screen=market-list&tab=crypto`

- **Stocks & Commodities (HIP-3)**: Filtered to HIP-3 assets
  - `/perps?screen=market-list&tab=stocks`

### Asset Trading Links

**Standard Crypto:**
- `/perps?screen=asset&symbol=BTC` - Bitcoin
- `/perps?screen=asset&symbol=ETH` - Ethereum
- `/perps?screen=asset&symbol=SOL` - Solana

**HIP-3 Format:**
- `/perps?screen=asset&symbol=xyz:TSLA` - Tesla via xyz DEX
- `/perps?screen=asset&symbol=xyz:xyz100` - xyz100 Index

## Smart Routing Behavior

The unified deep links include smart routing functionality:

### First-Time Users
All perps links redirect to tutorial for proper onboarding, regardless of URL parameters.

### Returning Users
Routed based on the screen parameter:
- No parameter or `screen=tabs` → Wallet home with Perps tab
- `screen=home` or `screen=markets` → PerpsHomeView
- `screen=market-list` → PerpsMarketListView (with optional tab filter)
- `screen=asset&symbol=X` → PerpsMarketDetailsView

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
# Wallet tab navigation
xcrun simctl openurl booted "https://link.metamask.io/perps"
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=tabs"

# Home view
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=home"
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=markets"

# Market list with filters
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=market-list"
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=market-list&tab=crypto"
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=market-list&tab=stocks"

# Asset trading (crypto)
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=asset&symbol=BTC"
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=asset&symbol=ETH"

# Asset trading (HIP-3)
xcrun simctl openurl booted "https://link.metamask.io/perps?screen=asset&symbol=xyz:TSLA"
```

#### Development URLs
```bash
# Wallet tab navigation
xcrun simctl openurl booted "https://link-test.metamask.io/perps"
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=tabs"

# Home view
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=home"
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=markets"

# Market list with filters
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=market-list"
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=market-list&tab=crypto"
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=market-list&tab=stocks"

# Asset trading (crypto)
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=asset&symbol=BTC"
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=asset&symbol=ETH"

# Asset trading (HIP-3)
xcrun simctl openurl booted "https://link-test.metamask.io/perps?screen=asset&symbol=xyz:TSLA"
```

### Android

#### Production URLs
```bash
# Wallet tab navigation
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps" io.metamask

# Home view
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps?screen=home" io.metamask

# Market list with filters
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps?screen=market-list" io.metamask
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps?screen=market-list&tab=crypto" io.metamask
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps?screen=market-list&tab=stocks" io.metamask

# Asset trading (crypto & HIP-3)
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps?screen=asset&symbol=BTC" io.metamask
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link.metamask.io/perps?screen=asset&symbol=xyz:TSLA" io.metamask
```

#### Development URLs
```bash
# Wallet tab navigation
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps" io.metamask.debug

# Home view
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps?screen=home" io.metamask.debug

# Market list with filters
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps?screen=market-list" io.metamask.debug
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps?screen=market-list&tab=crypto" io.metamask.debug
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps?screen=market-list&tab=stocks" io.metamask.debug

# Asset trading (crypto & HIP-3)
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps?screen=asset&symbol=BTC" io.metamask.debug
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps?screen=asset&symbol=xyz:TSLA" io.metamask.debug
```

### Manual Testing Scenarios

Test the unified deeplink structure and smart routing with these scenarios:

1. **First-time user testing**: All perps URLs should redirect to tutorial regardless of parameters
2. **Returning user - Default Navigation**: `/perps` should open wallet home with perps tab
3. **Returning user - Explicit Navigation**: `/perps?screen=tabs` should open wallet home with perps tab
4. **Returning user - Home View**: `/perps?screen=home` should open PerpsHomeView directly
5. **Returning user - Backwards Compat**: `/perps?screen=markets` should behave same as `screen=home`
6. **Market List - All**: `/perps?screen=market-list` should open full market browser
7. **Market List - Filtered**: Test `tab=crypto` and `tab=stocks` filters
8. **Asset-specific (Crypto)**: `/perps?screen=asset&symbol=BTC` should open BTC trading page
9. **Asset-specific (HIP-3)**: `/perps?screen=asset&symbol=xyz:TSLA` should open TSLA with xyz DEX source
10. **Invalid symbols**: Test with unsupported asset symbols (should fallback to home)

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
