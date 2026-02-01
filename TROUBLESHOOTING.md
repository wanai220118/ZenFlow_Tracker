# Troubleshooting Guide

## "Failed to download remote update" Error

This error typically occurs when Expo Go cannot download the JavaScript bundle. Here are solutions in order of likelihood:

### Solution 1: Clear Cache and Restart (Most Common Fix)
```bash
# Stop the server (Ctrl+C), then:
npx expo start --clear
```

### Solution 2: Use Tunnel Mode
If you're on different networks or having connectivity issues:
```bash
npm run start:tunnel
```

### Solution 3: Check Video File Size
The video file might be too large. Check the size:
```bash
# On Windows PowerShell:
Get-Item assets\videos\dummyvid.mp4 | Select-Object Length
```

If the video is larger than 10MB, it might cause issues. Consider:
- Compressing the video
- Using a smaller placeholder video
- Temporarily removing video functionality to test

### Solution 4: Network Troubleshooting
1. **Same Network**: Ensure phone and computer are on the same WiFi
2. **Firewall**: Temporarily disable Windows Firewall to test
3. **Antivirus**: Add Node.js and Expo to antivirus exceptions
4. **Mobile Hotspot**: Try using your phone's hotspot instead of WiFi

### Solution 5: Update Expo Go
Make sure you have the latest version:
- iOS: App Store → Search "Expo Go" → Update
- Android: Play Store → Search "Expo Go" → Update

### Solution 6: Try Localhost Mode
```bash
npm run start:localhost
```
Then manually enter the URL shown in the terminal into Expo Go app.

### Solution 7: Check Expo Server Logs
Look at the terminal where `expo start` is running. Check for:
- Network errors
- Bundle size warnings
- Asset loading errors

### Solution 8: Temporary Workaround - Disable Videos
If videos are causing the issue, you can temporarily disable them:

1. Comment out video loading in `src/screens/ExerciseDetailScreen.js`
2. Test if the app loads without videos
3. If it works, the video file is the issue

### Solution 9: Use Development Build
If Expo Go continues to fail, consider creating a development build:
```bash
npx expo install expo-dev-client
npx expo prebuild
```

### Still Not Working?
1. Check if other Expo apps work on your device
2. Try on a different device
3. Check Expo status: https://status.expo.dev
4. Check your internet connection speed
5. Try a different network (mobile data vs WiFi)

