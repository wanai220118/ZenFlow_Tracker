# Alternatives to Expo Go

Since Expo Go is having connection issues, here are better alternatives:

## Option 1: Android Emulator (Recommended - Easiest)

### Setup:
1. **Install Android Studio**:
   - Download from: https://developer.android.com/studio
   - Install Android Studio
   - During setup, install Android SDK and Android Virtual Device (AVD)

2. **Create an Android Emulator**:
   - Open Android Studio
   - Go to Tools → Device Manager
   - Click "Create Device"
   - Select a device (e.g., Pixel 5)
   - Download a system image (API 33 or 34 recommended)
   - Finish setup

3. **Run the app**:
   ```bash
   npm run android
   ```
   This will:
   - Start the emulator (if not running)
   - Build and install the app
   - Launch your app

**Advantages:**
- No network issues
- Faster development
- Full native features
- No size limitations

---

## Option 2: iOS Simulator (Mac Only)

### Setup:
1. **Install Xcode** (from App Store - large download ~12GB)

2. **Install CocoaPods**:
   ```bash
   sudo gem install cocoapods
   ```

3. **Run the app**:
   ```bash
   npm run ios
   ```

---

## Option 3: Development Build (Best for Real Device)

This creates a custom app that works like Expo Go but is specific to your project.

### Setup:

1. **Install expo-dev-client**:
   ```bash
   npx expo install expo-dev-client
   ```

2. **For Android**:
   ```bash
   # Generate native Android project
   npx expo prebuild --platform android
   
   # Build and install on connected device
   npx expo run:android
   ```
   
   Or build APK:
   ```bash
   cd android
   ./gradlew assembleDebug
   # APK will be in android/app/build/outputs/apk/debug/
   ```

3. **For iOS** (Mac only):
   ```bash
   npx expo prebuild --platform ios
   npx expo run:ios
   ```

**Advantages:**
- Works on real device
- No network dependency
- Can include custom native code
- Better performance

---

## Option 4: EAS Build (Cloud Build - No Local Setup)

Build in the cloud and install on your device.

### Setup:

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Login**:
   ```bash
   eas login
   ```

3. **Configure**:
   ```bash
   eas build:configure
   ```

4. **Build for Android**:
   ```bash
   eas build --platform android --profile development
   ```

5. **Install on device**:
   - EAS will provide a download link
   - Download and install the APK on your Android device
   - Or scan QR code to install

**Advantages:**
- No local Android Studio needed
- Works on any device
- Professional build process

---

## Quick Start: Android Emulator

**Fastest way to get running:**

1. Install Android Studio
2. Create an emulator
3. Run: `npm run android`

That's it! The app will build and run directly on the emulator.

---

## Which Should You Choose?

- **Just want to test quickly?** → Android Emulator
- **Want to test on real device?** → Development Build
- **Don't want to install Android Studio?** → EAS Build
- **Have a Mac?** → iOS Simulator

---

## Troubleshooting Development Build

If you get errors during `expo prebuild`:

1. Make sure you have:
   - Android Studio installed (for Android)
   - Xcode installed (for iOS/Mac)
   - Java JDK installed

2. Clear and retry:
   ```bash
   npx expo prebuild --clean
   ```

