# Enigma
Enigma is a [React-Native](https://reactnative.dev/) cross-platform [Reddit](https://www.reddit.com/) client.

Hope .gitignore has no missed sensitive files.

- [Enigma](#enigma)
  - [Features](#features)
  - [Download](#download)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Icons](#icons)
  - [Screenshots](#screenshots)
  - [Update](#update)
    - [dependencies](#dependencies)
  - [Some Troubleshooting](#some-troubleshooting)
    - [Android](#android)
    - [IOS](#ios)

---

## Features

* Pull to refresh
* Endless scroll (Infinite scroll)
* Clickable images (open in full(height or wide) screen)
* NSFW blur 
* Share buttons for direct-post and content-link 
* Classless (Can i call it "Feature"??) 

---

## Download
Think about your device security before download.

[Download](https://drive.google.com/drive/folders/1-Pm2CnwbZ50MSPaXl3NOpuZwiAy4kkSF)

## Installation

```bash
git clone https://github.com/Sarmirim/Enigma.git && cd ./Enigma && npm install
```
---
## Usage

You can delete android/ios folder and re-create them from react-native CLI.

<details>
<summary>Android instruction</summary>
React Native

```bash
react-native run-android
```

Android Studio

1. Open project from Enigma/android

2. Build => Make Project 
3. Errors ? (fix them) : (Run => run 'app' with AVD emulator or your device conneted)

</details>

IOS not tested

---

## Icons
``` 
npm install react-native-vector-icons --save
react-native link react-native-vector-icons 
```
---

## Screenshots

|Screenshot#1,2                   |Screenshot#3,4
|:-----------------------------:|:---------------------------------:
|![main](/screenshots/main.png) ![scroll](/screenshots/scroll.png) |  ![scroll](/screenshots/fullscreen1.png) ![scroll](/screenshots/fullscreen2.png)

---

## Update 
### dependencies

Update can cause problems 

```bash
npm-check-updates -u
npm install
```

---

## Some Troubleshooting
### Android
Windows does not need `./`

```bash
cd ./android
./gradlew clean
./gradlew assembleDebug or ./gradlew assembleRelease 
```

### IOS
<details>
Never been tested

```Nothing to see here (Please disperete/move along)```
</details>