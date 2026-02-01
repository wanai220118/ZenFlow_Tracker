# ZenFlow Tracker

A React Native app for tracking daily exercise, weight, steps, and exercise routines with video guidance. Built with Expo.

## Features

- **Profile Management** — Store age, height, weight, and goals
- **Daily Tracking** — Log daily weight, steps walked, and VStepper steps
- **Exercise Library** — Add your own exercises with optional video demonstrations; edit or remove anytime
- **Exercise Timer** — 3 sets per exercise with built-in timer and rest periods
- **Video Playback** — Watch exercise videos with play/pause and auto-play
- **Statistics & Charts** — Progress, weekly overview, and weight chart
- **Workout History** — View past workouts and summaries
- **Goal Setting** — Set and track fitness goals
- **Export Data** — Export your data for backup
- **Edit & Delete Exercises** — Customize the exercise list

## Color Palette

| Name         | Hex       |
| ------------ | --------- |
| Primary Dark | `#103713` |
| Primary Green| `#628B35` |
| Light Beige  | `#E2DBD0` |
| Off White    | `#FFFDF5` |

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run the app**

   | Option | Command | Notes |
   |--------|---------|--------|
   | **Android Emulator** | `npm run android` | Requires [Android Studio](https://developer.android.com/studio) and an AVD. See [EMULATOR_SETUP.md](./EMULATOR_SETUP.md). |
   | **iOS Simulator** (Mac) | `npm run ios` | Requires Xcode. |
   | **Web** | `npm run web` | Test in browser. |
   | **Expo Go** | Scan QR from terminal | Install Expo Go on your phone. See [ALTERNATIVES.md](./ALTERNATIVES.md) if connection fails. |

## Building for Production

- **Local APK (debug):** [BUILD_APK_LOCAL.md](./BUILD_APK_LOCAL.md) or [QUICK_APK_GUIDE.md](./QUICK_APK_GUIDE.md)
- **EAS Build (cloud):** [EAS_BUILD_STEPS.md](./EAS_BUILD_STEPS.md)
- **Troubleshooting builds:** [BUILD_TROUBLESHOOTING.md](./BUILD_TROUBLESHOOTING.md), [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## Project Structure

```
ExerciseTracker/
├── App.js                    # App entry point
├── app.json                  # Expo config (name: ZenFlow Tracker)
├── package.json
├── assets/
│   ├── images/               # logo.png, placeholder.jpg
│   └── videos/               # Exercise demo videos
└── src/
    ├── components/
    │   ├── ErrorBoundary.js
    │   ├── ExerciseCard.js
    │   ├── LoadingScreen.js
    │   ├── RestTimer.js
    │   ├── StepCounter.js
    │   ├── Timer.js
    │   └── WeightChart.js
    ├── data/
    │   └── exercises.js      # Exercise definitions
    ├── navigation/
    │   └── AppNavigator.js
    ├── screens/
    │   ├── AddEditExerciseScreen.js
    │   ├── DailyEntryScreen.js
    │   ├── DashboardScreen.js
    │   ├── ExerciseDetailScreen.js
    │   ├── ExerciseListScreen.js
    │   ├── ExerciseSummaryScreen.js
    │   ├── ExportDataScreen.js
    │   ├── GoalSettingScreen.js
    │   ├── ProfileScreen.js
    │   ├── StatsScreen.js
    │   └── WorkoutHistoryScreen.js
    └── storage/
        └── localStorage.js  # AsyncStorage persistence
```

## Usage

1. **Profile** — Enter age, height, weight, and goals in the Profile tab.  
2. **Daily Entry** — Log daily weight, steps, and VStepper steps.  
3. **Exercises** — Pick an exercise, follow the video, and complete 3 sets with the timer.  
4. **Stats** — View progress, weekly stats, and weight chart.  
5. **History** — Review past workouts and summaries.  

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo (LAN) |
| `npm run start:clear` | Start with cache cleared |
| `npm run start:tunnel` | Start with tunnel (for Expo Go on different network) |
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS simulator |
| `npm run web` | Run in browser |

## Tech Stack

- **React Native** + **Expo** (SDK 54)
- **React Navigation** (stack + bottom tabs)
- **AsyncStorage** — local data
- **Expo AV** — video playback
- **Expo Image Picker** — profile/photo (if used)

## Data & Privacy

- All data is stored **locally** on the device (AsyncStorage).  
- No account or server required.  
- Use **Export Data** in the app to backup or move your data.  

## Troubleshooting

- **QR / Expo Go connection:** [EXPO_GO_TROUBLESHOOTING.md](./EXPO_GO_TROUBLESHOOTING.md), [FIX_EXPO_CONNECTION.md](./FIX_EXPO_CONNECTION.md)  
- **Build / SDK issues:** [BUILD_TROUBLESHOOTING.md](./BUILD_TROUBLESHOOTING.md), [FIX_SDK_VERSION.md](./FIX_SDK_VERSION.md)  
- **USB / device:** [USB_CONNECTION_GUIDE.md](./USB_CONNECTION_GUIDE.md)  

## License

Private project. See repository owner for terms.
