# ✦ For Srinita — Setup Guide

A personal website for Srinita while Saaketh is away. Built with HTML/CSS/JS + Firebase.

---

## Files Overview

| File | Page |
|------|------|
| `index.html` | Home + live countdown to June 8, 2026 |
| `letters.html` | Love letters + reasons I love you |
| `feelings.html` | Emotional support messages by mood |
| `journal.html` | Firebase-backed private journal |
| `memories.html` | Photo wall + Spotify playlist |
| `bucketlist.html` | Firebase-backed bucket list |
| `style.css` | Shared styles |
| `shared.js` | Shared JS (starfield, hearts, Firebase init, toast) |

---

## Step 1 — Firebase Setup

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and open your project
2. Go to **Project Settings → General → Your apps → Web app**
3. Copy your Firebase config object
4. Open `shared.js` and replace the placeholder values at the top:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",                        // ← replace
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // ← replace
  projectId: "YOUR_PROJECT_ID",                  // ← replace
  storageBucket: "YOUR_PROJECT_ID.appspot.com",  // ← replace
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // ← replace
  appId: "YOUR_APP_ID"                           // ← replace
};
```

---

## Step 2 — Firestore Rules

In Firebase Console → Firestore → Rules, set:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> Note: This is open access — fine for a private personal site. If you want more security, add auth later.

---

## Step 3 — Firebase Storage (for photos)

1. Enable **Firebase Storage** in your project
2. Upload photos to a folder called `memories/`
3. For each photo, add **custom metadata**:
   - `caption` → the title shown on the card (e.g. "Our first trip ✦")
   - `description` → a short note shown below (e.g. "Remember how lost we got?")
4. Set Storage rules to allow public read:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

**Alternative:** If you'd rather hardcode photo URLs, open `memories.html` and add your photos to the `HARDCODED_PHOTOS` array at the top of the script.

---

## Step 4 — GitHub Pages Deployment

1. Create a new GitHub repository (e.g. `for-srinita`)
2. Push all files to the `main` branch
3. Go to **Settings → Pages**
4. Set Source to `Deploy from branch` → `main` → `/ (root)`
5. Your site will be live at: `https://yourusername.github.io/for-srinita`

---

## Personalizing the Content

### Love Letters (`letters.html`)
- Edit the 3 letter bodies directly in the HTML — find `<p class="letter-body">` tags
- Replace the placeholder `[your favorite memory here]` in Letter III with a real memory

### Reasons I Love You (`letters.html`)
- Edit the `reasons` array in the `<script>` at the bottom of `letters.html`

### Emotional Support Messages (`feelings.html`)
- Edit the `<p class="message-body">` content inside each `#panel-*` div

### Bucket List (`bucketlist.html`)
- Edit the `SEED_ITEMS` array in the script — these are pre-seeded to Firebase on first load

---

## Spotify Playlist

The playlist is already embedded. To change it:
1. Open `memories.html`
2. Find the `<iframe>` with `src="https://open.spotify.com/embed/playlist/..."`
3. Replace the playlist ID in the URL
4. Also update the `href` on the "Open in Spotify" link

---

That's it! The site is entirely static except for Firestore (journal + bucket list) and optionally Firebase Storage (photos). No server, no backend, no login required.

💌 Made with love by Saaketh
