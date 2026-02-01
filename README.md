# ZenFlow Tracker

A beautiful React Native app for tracking daily exercise, weight, steps, and ancient exercise routines with video guidance.

## Features

- **Profile Management**: Store your age, height, and weight
- **Daily Tracking**: Log daily weight, steps walked, and VStepper steps
- **Ancient Exercises**: 11 traditional exercises with video demonstrations
- **Exercise Timer**: 3 sets per exercise with built-in timer
- **Video Playback**: Watch exercise videos with play/pause and auto-play options
- **Statistics**: View your progress and weekly overview
- **Beautiful UI**: Modern design with a calming color palette

## Color Palette

- Primary Dark: `#103713`
- Primary Green: `#628B35`
- Light Beige: `#E2DBD0`
- Off White: `#FFFDF5`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on your device:

   **Option A: Android Emulator (Recommended - No Expo Go needed)**
   - Install [Android Studio](https://developer.android.com/studio)
   - Create an Android Virtual Device (AVD)
   - Run: `npm run android`
   - App will build and run directly on emulator

   **Option B: iOS Simulator (Mac only)**
   - Install Xcode from App Store
   - Run: `npm run ios`

   **Option C: Expo Go (If network allows)**
   - Install Expo Go app on your phone
   - Scan QR code with Expo Go app
   - See [ALTERNATIVES.md](./ALTERNATIVES.md) if Expo Go doesn't work

   **Option D: Development Build (For real device)**
   - See [ALTERNATIVES.md](./ALTERNATIVES.md) for setup instructions

## Troubleshooting

### QR Code DNS Error
If you see "DNS_PROBE_FINISHED_NXDOMAIN" when scanning the QR code:

1. **Make sure you're using Expo Go app**, not your phone's camera or browser
2. **Try different connection modes**:
   - If on the same WiFi network: `npm run start:lan`
   - If on different networks: `npm run start:tunnel` (uses tunnel mode)
   - For localhost only: `npm run start:localhost`
3. **Check your firewall** - it might be blocking the connection
4. **Ensure both devices are on the same network** (for LAN mode)

### "Failed to download remote update" Error
If you see "java.io.IOException: Failed to download remote update":

1. **Clear Expo cache and restart**:
   ```bash
   npx expo start --clear
   ```

2. **Check your network connection**:
   - Make sure your computer and phone are on the same WiFi network
   - Try disconnecting and reconnecting to WiFi on both devices

3. **Try tunnel mode** (works across different networks):
   ```bash
   npm run start:tunnel
   ```

4. **Restart Expo server**:
   - Stop the server (Ctrl+C)
   - Clear cache: `npx expo start --clear`
   - Restart: `npm start`

5. **Check firewall/antivirus**:
   - Temporarily disable firewall to test
   - Allow Node.js and Expo through firewall

6. **Try a different network**:
   - Switch to mobile hotspot
   - Or use a different WiFi network

7. **Update Expo Go app**:
   - Make sure you have the latest version of Expo Go installed

8. **If still failing, try localhost mode**:
   ```bash
   npm run start:localhost
   ```
   Then manually enter the URL shown in terminal into Expo Go app

## Project Structure

```
ExerciseTracker/
├── App.js                 # Main app entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── assets/
│   ├── images/
│   │   ├── logo.png     # App logo
│   │   └── placeholder.jpg
│   └── videos/
│       └── dummyvid.mp4
└── src/
    ├── components/       # Reusable components
    │   ├── ExerciseCard.js
    │   ├── StepCounter.js
    │   └── Timer.js
    ├── data/
    │   └── exercises.js # Exercise data
    ├── navigation/
    │   └── AppNavigator.js
    ├── screens/          # App screens
    │   ├── DailyEntryScreen.js
    │   ├── ExerciseDetailScreen.js
    │   ├── ExerciseListScreen.js
    │   ├── ProfileScreen.js
    │   └── StatsScreen.js
    └── storage/
        └── localStorage.js # Data persistence
```

## Exercises Included

1. Lymphatic Hopping
2. Arm Swings
3. Trunk Twists
4. Body Waves
5. Spinal Twists
6. Underarm Tapping
7. Marches
8. Horse Stance Swings 100
9. Knee Lifts with Downward Press
10. Waist Arm Movement
11. Lunges with Press

## Usage

1. **Profile**: Start by entering your age, height, and weight in the Profile tab
2. **Daily Entry**: Log your daily weight, steps, and VStepper steps
3. **Exercises**: Browse exercises, select one, and complete 3 sets with the timer
4. **Stats**: View your progress and weekly statistics

## Technologies Used

- React Native
- Expo
- React Navigation
- AsyncStorage for data persistence
- Expo AV for video playback

## Notes

- All data is stored locally on your device
- Placeholder images and videos are used (replace with actual content)
- The app name "ZenFlow Tracker" provides a more elegant branding than "Exercise Tracker"

