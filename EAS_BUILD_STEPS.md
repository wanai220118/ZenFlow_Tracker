# EAS Build - Step by Step Instructions

## ✅ Step 1: Install expo-dev-client (Already Done!)
```powershell
npx expo install expo-dev-client
```

## ✅ Step 2: Initialize EAS Project

Run this command in your terminal (it will ask you to confirm):
```powershell
eas project:init
```

When prompted:
- **"Would you like to create a project for @khalidahsyazwan/ExerciseTracker?"** → Type `yes` and press Enter

This will create an EAS project linked to your Expo account.

## ✅ Step 3: Build the APK

After the project is initialized, run:
```powershell
eas build --platform android --profile development
```

This will:
1. Upload your code to Expo's servers
2. Build your app in the cloud (takes 10-15 minutes)
3. Give you a download link for the APK

## ✅ Step 4: Install on Your Phone

1. Download the APK from the link provided by EAS
2. Transfer it to your phone (email, USB, cloud storage)
3. On your phone: 
   - Settings → Security → Enable "Install from unknown sources"
4. Install the APK file
5. On your computer, run: `npm start`
6. Open the app on your phone - it will connect automatically to your dev server

---

## Alternative: Build Preview APK (Standalone)

If you want a standalone APK that doesn't need the dev server:

```powershell
eas build --platform android --profile preview
```

This creates a standalone APK that works without `npm start` running.

---

## Troubleshooting

**If `eas project:init` fails:**
- Make sure you're logged in: `eas whoami`
- If not logged in: `eas login`

**If build fails:**
- Check your internet connection
- Make sure all files are committed to git: `git status`
- Try again: `eas build --platform android --profile development`

---

## Quick Commands Reference

```powershell
eas login                    # Login to Expo account
eas whoami                   # Check if you're logged in
eas project:init             # Initialize EAS project (run this first!)
eas build --platform android --profile development  # Build development APK
eas build --platform android --profile preview      # Build standalone APK
```

---

**Note:** The `eas project:init` command needs to be run interactively in your terminal. It will ask you to confirm creating the project. Just type `yes` when prompted!
