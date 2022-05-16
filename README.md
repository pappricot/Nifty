# Nifty installation
1. In the root directory run `yarn install` or `npm install`

#### iOS Simulator
2.  `cd` into the `ios/` directory and run `pod install`
3.  In the root directory, run `yarn run ios` or `npm run ios`

#### Android
2. Use physical device (preferred)
3. Check `adb devices`
4. Make sure you have correct path in .bash_profile
5. In the root directory, run `yarn run android` or `npm run android`


#### Example on app interaction
The app consists of 2 screen: Login and CryptoDetail screens
1.Login screen: 
  - Enter existing address, e.g "Z1" to proceed with
2.CryptoDetail screen: 
  - Check user's current balance in "Account Balance" section
  - Send Jobcoins. E.g: fromAddress="Z1", toAddress="Alice", amount=5
  - Monitor instant change in user's balance and Balance History chart
  - Sign out