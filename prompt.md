Create a minimal web page that contain a QRCode so it easy to access via a mobile without typing.
The page must be minimum and used to create different deeplinks to test the perps feature on metamask-mobile with links to test this PR https://github.com/MetaMask/metamask-mobile/pull/18568

Uusually it is tested with commands such as:
iOS Testing
# Test Perps market overview deeplink
xcrun simctl openurl booted "https://link-test.metamask.io/perps"

# Test specific asset deeplinks
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=BTC"
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=ETH"
xcrun simctl openurl booted "https://link-test.metamask.io/perps-asset?symbol=SOL"
Android Testing
# Test Perps market overview deeplink
adb shell am start -W -a android.intent.action.VIEW -d "https://link-test.metamask.io/perps" io.metamask.debug

# Test specific asset deeplinks
adb shell am start -W -a android.intent.action.VIEW -d "https://link-test.metamask.io/perps-asset?symbol=BTC" io.metamask.debug
adb shell am start -W -a android.intent.action.VIEW -d "https://link-test.metamask.io/perps-asset?symbol=ETH" io.metamask.debug


but I want to have a full validation page for people to try. Maybe we can use a very simple nextjs or react project but it must be minimum and deployable for free so we could use vercel for quick deployment.

Keep in mind very minimal page with clean layout, maybe each link can be displayed and have a copy button as well for easy reference but the goal is to demonstrate when opening it from phone that it opens the correct page in the app.

Let me know how to validate locally then we can do the deployment with vercel which hopefully doens tneed human intervention