// ──────────────────────────────────────────────────────────────
// CONFIGURARE FIREBASE
// ──────────────────────────────────────────────────────────────
// Înlocuiește valorile de mai jos cu cele din Firebase Console:
// Project Settings (rotița din stânga sus) → General → scroll jos
// la "Your apps" → click pe aplicația web → "SDK setup and configuration"
//
// E SIGUR ca acest fișier (cu apiKey-ul inclus) să fie public pe GitHub.
// apiKey-ul Firebase pentru web NU e un secret — accesul real e controlat
// de Firestore Security Rules (vezi firestore.rules), nu de cheia asta.
// ──────────────────────────────────────────────────────────────

export const firebaseConfig = {
    apiKey: "AIzaSyBYFLcJwcTmeu-B5iCJWGxc2QE5bGJjXak",
    authDomain: "masters-hunt.firebaseapp.com",
    projectId: "masters-hunt",
    storageBucket: "masters-hunt.firebasestorage.app",
    messagingSenderId: "189761761863",
    appId: "1:189761761863:web:593df974c779d833607762"
};