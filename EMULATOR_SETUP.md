# Running App on Android Emulator - Quick Guide

## Option 1: Use Expo Go on Emulator (Easiest)

### Step 1: Install Android Studio
1. Download from: https://developer.android.com/studio
2. Install Android Studio
3. During installation, make sure to check:
   - ✅ Android SDK
   - ✅ Android SDK Platform
   - ✅ Android Virtual Device (AVD)

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

### Step 4: Install Expo Go on Emulator
1. In the emulator, open Google Play Store
2. Search for "Expo Go"
3. Install it

### Step 5: Run Your App
```powershell
npm start
```

Then in the Expo Go app on the emulator, scan the QR code or type the URL manually.

---

## Option 2: Test in Browser (No Setup Needed!)

This is the fastest way to test:

```powershell
npm run web
```

This opens your app in your browser - no emulator needed!

---

## Option 3: Build and Run on Emulator (Full Native)

If you want to build the native app and run it on emulator:

### Prerequisites:
- Android Studio installed
- Emulator created and running

### Steps:
```powershell
# Make sure emulator is running first!
# Then run:
npm run android
```

This will:
1. Build the native Android app
2. Install it on the emulator
3. Launch it automatically

**Note:** First build takes 5-10 minutes, subsequent builds are faster.

---

## Quick Start: Browser Test

**Fastest option - no setup needed:**

```powershell
npm run web
```

This opens your app in the browser immediately!

---

## Troubleshooting

**If `npm run android` fails:**
- Make sure Android Studio is installed
- Make sure emulator is running (check Android Studio → Device Manager)
- Make sure ANDROID_HOME is set (usually set automatically by Android Studio)

**If Expo Go doesn't connect:**
- Make sure your computer and emulator are on the same network
- Try `npm start --localhost` instead
- Check firewall settings
