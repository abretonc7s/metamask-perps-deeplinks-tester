# MetaMask Perps Deep Links Tester

A minimal web application for testing MetaMask Mobile perpetuals trading deep links. This tool generates QR codes and provides easy access to test deep links for the perps feature ([PR #18568](https://github.com/MetaMask/metamask-mobile/pull/18568)).

## Features

- QR codes for each deep link for easy mobile scanning
- Copy-to-clipboard functionality for deep links
- Testing instructions for iOS and Android
- Clean, minimal interface optimized for mobile devices

## Deep Links Supported

- **Perps Market Overview**: `https://link-test.metamask.io/perps`
- **BTC Perps**: `https://link-test.metamask.io/perps-asset?symbol=BTC`
- **ETH Perps**: `https://link-test.metamask.io/perps-asset?symbol=ETH`
- **SOL Perps**: `https://link-test.metamask.io/perps-asset?symbol=SOL`

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

```bash
# Market overview
xcrun simctl openurl booted "https://link-test.metamask.io/perps"

# Specific assets
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=BTC"
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=ETH"
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=SOL"
```

### Android

```bash
# Market overview
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps" io.metamask.debug

# Specific assets
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://link-test.metamask.io/perps-asset?symbol=BTC" io.metamask.debug
```

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- QRCode library for QR generation

## License

MIT
