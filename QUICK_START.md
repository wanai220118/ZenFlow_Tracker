# Quick Start Guide - Get Your App Running NOW

## 🚀 Fastest Way: Android Emulator

### Step 1: Install Android Studio
1. Go to: https://developer.android.com/studio
2. Download Android Studio
3. Run the installer
4. During installation, make sure to check:
   - ✅ Android SDK
   - ✅ Android SDK Platform
   - ✅ Android Virtual Device

### Step 2: Create an Emulator
1. Open Android Studio
2. Click "More Actions" → "Virtual Device Manager" (or Tools → Device Manager)
3. Click "Create Device"
4. Select "Phone" → Choose "Pixel 5" → Click "Next"
5. Click "Download" next to a system image (choose "Tiramisu" API 33 or "UpsideDownCake" API 34)
6. Wait for download to complete
7. Click "Next" → "Finish"

### Step 3: Start Emulator
1. In Device Manager, click the ▶️ Play button next to your device
2. Wait for emulator to boot (first time takes 2-3 minutes)

### Step 4: Run Your App
```bash
npm run android
```

**That's it!** Your app will build and install on the emulator.

---

## 📱 Alternative: Build APK for Your Phone (No Emulator Needed)

### Step 1: Install expo-dev-client
```bash
npx expo install expo-dev-client
```

### Step 2: Generate Android Project
```bash
npx expo prebuild --platform android
```

### Step 3: Build APK
```bash
cd android
.\gradlew assembleDebug
```

### Step 4: Install on Phone
1. Find the APK: `android\app\build\outputs\apk\debug\app-debug.apk`
2. Transfer to your phone (USB, email, cloud)
3. On your phone: Settings → Security → Allow installation from unknown sources
4. Install the APK
5. Run: `npm start` on your computer
6. Open the app on your phone - it will connect automatically

---

## 🌐 Test in Browser First (Verify Code Works)

```bash
npm run web
```

This opens the app in your browser. If this works, your code is fine and it's just an Expo Go connection issue.

---

## ❓ What Error Are You Seeing?

Please tell me:
1. What command are you running?
2. What error message appears?
3. Do you have Android Studio installed?

This will help me give you the exact solution!

