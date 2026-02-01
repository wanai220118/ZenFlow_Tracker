# Building Your App - Instructions

## ❌ The Problem
You tried `npm build run` which doesn't exist. Also, there's a Java/Kotlin version mismatch when building locally.

## ✅ Solution: Use EAS Build (Recommended - No Local Setup)

EAS Build builds your app in the cloud, so you don't need Android Studio or worry about Java versions.

### Step 1: Install EAS CLI
```powershell
npm install -g eas-cli
```

### Step 2: Login to Expo
```powershell
eas login
```
(If you don't have an account, create one at https://expo.dev)

### Step 3: Configure Build
```powershell
eas build:configure
```

### Step 4: Build for Android
```powershell
eas build --platform android --profile development
```

This will:
- Build your app in the cloud
- Give you a download link for the APK
- Take about 10-15 minutes

### Step 5: Install on Your Phone
1. Download the APK from the link provided
2. Transfer to your phone (email, USB, cloud storage)
3. On your phone: Settings → Security → Allow installation from unknown sources
4. Install the APK
5. Run `npm start` on your computer
6. Open the app - it will connect automatically

---

## Alternative: Use Expo Go (Easiest for Testing)

If you just want to test the app quickly:

```powershell
npm start
```

Then scan the QR code with Expo Go app on your phone.

**Note:** Make sure your phone and computer are on the same WiFi network.

---

## Alternative: Install Java 17 (For Local Builds)

If you want to build locally, you need Java 17 (not Java 21):

1. Download Java 17: https://adoptium.net/temurin/releases/?version=17
2. Install it
3. Set JAVA_HOME to Java 17
4. Then run:
   ```powershell
   cd android
   .\gradlew assembleDebug
   ```

But **EAS Build is much easier** and doesn't require any local setup!

---

## Quick Reference: Available Commands

```powershell
npm start              # Start dev server
npm run web            # Test in browser
npm run android        # Run on Android (via Expo Go)
npm run prebuild       # Generate native projects
npm run dev:android    # Build and run on device/emulator
```

---

## Need Help?

If EAS Build doesn't work, try:
1. Make sure you're logged in: `eas whoami`
2. Check your internet connection
3. Try again: `eas build --platform android --profile development`
