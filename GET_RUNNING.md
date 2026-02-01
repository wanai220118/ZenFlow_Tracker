# 🚀 Get Your App Running - Step by Step

## Option 1: Test in Browser (Easiest - No Setup Needed)

This verifies your code works:

```bash
npm run web
```

**If this works:** Your code is fine! The issue is just with Expo Go/device connection.

**If this fails:** There's a code error - share the error message with me.

---

## Option 2: Build APK and Install on Phone (No Emulator Needed)

### Step 1: Install expo-dev-client
```bash
npx expo install expo-dev-client
```

### Step 2: Generate Android Project
```bash
npx expo prebuild --platform android
```

**If you get an error about Java/Android SDK:**
- Install Android Studio first (it includes everything)
- Then run the command again

### Step 3: Build the APK
```bash
cd android
.\gradlew assembleDebug
```

**Wait for build to complete** (first time takes 5-10 minutes)

### Step 4: Find and Install APK
1. APK location: `android\app\build\outputs\apk\debug\app-debug.apk`
2. Copy this file to your phone (USB, email, cloud storage)
3. On your phone: Enable "Install from unknown sources" in Settings
4. Install the APK file
5. Open the app on your phone

### Step 5: Connect to Dev Server
1. On your computer, run: `npm start`
2. Open the app on your phone
3. It should connect automatically (make sure phone and computer are on same WiFi)

---

## Option 3: Android Emulator (Best for Development)

### Prerequisites Check:
Do you have Android Studio installed?
- ✅ Yes → Skip to "Create Emulator" below
- ❌ No → Install it first: https://developer.android.com/studio

### Create Emulator:
1. Open Android Studio
2. Click "More Actions" → "Virtual Device Manager"
3. Click "Create Device"
4. Select "Pixel 5" → Next
5. Download a system image (API 33 recommended) → Next → Finish
6. Click ▶️ Play button to start emulator

### Run App:
```bash
npm run android
```

**First time:** This will take 5-10 minutes to build
**After that:** Much faster (30 seconds)

---

## Still Stuck?

**Tell me:**
1. Which option are you trying?
2. What's the exact error message?
3. Do you have Android Studio installed?

I'll help you fix it!

