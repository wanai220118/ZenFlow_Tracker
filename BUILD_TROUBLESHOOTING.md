# Build Troubleshooting Guide

## Current Issue
EAS Build is failing with: "Gradle build failed with unknown error"

## Step 1: Check Build Logs

The build logs will show the exact error. Open this URL in your browser:
```
https://expo.dev/accounts/khalidahsyazwan/projects/ExerciseTracker/builds/02ca8417-4162-4664-bc4d-05171fd45cf4#run-gradlew
```

Look for:
- **Kotlin version errors** - Should show "incompatible version"
- **Gradle errors** - Should show specific task failures
- **Dependency errors** - Missing or incompatible packages

## Step 2: Common Solutions

### Option A: Let EAS Generate Fresh Android Project

Remove the android folder and let EAS Build generate it:

```powershell
# Remove android folder
Remove-Item -Recurse -Force android

# Commit the change
git add -A
git commit -m "Remove android folder for fresh EAS generation"

# Build again
eas build --platform android --profile development
```

### Option B: Use Preview Profile (Standalone APK)

The preview profile might work better:

```powershell
eas build --platform android --profile preview
```

This creates a standalone APK that doesn't need the dev server.

### Option C: Check Build Logs for Specific Error

1. Go to the build logs URL
2. Look for the "Run gradlew" section
3. Find the actual error message
4. Share the error with me so I can fix it

## Step 3: Alternative - Build Locally

If EAS Build continues to fail, you can build locally:

```powershell
# Install Java 17 (not Java 21!)
# Download from: https://adoptium.net/temurin/releases/?version=17

# Then build
cd android
.\gradlew assembleDebug

# APK will be in: android\app\build\outputs\apk\debug\app-debug.apk
```

## What to Check in Build Logs

When you open the build logs, look for:

1. **Kotlin errors**: 
   - "incompatible version of Kotlin"
   - "Class was compiled with an incompatible version"

2. **Gradle errors**:
   - "Task failed"
   - "Could not resolve dependency"

3. **Java errors**:
   - "Unsupported class file major version"
   - "Java version mismatch"

## Quick Fix: Try Preview Profile

The preview profile often works better:

```powershell
eas build --platform android --profile preview
```

This builds a standalone APK that works without `npm start`.

---

**Next Step**: Check the build logs URL and share the specific error message you see!
