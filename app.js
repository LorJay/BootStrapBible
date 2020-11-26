

// Your web app's Firebase configuration
 var firebaseConfig = {
        apiKey: "AIzaSyB22uKTHDJUJrwqqmfP1bkB0AxFJrJ7HL0",
        authDomain: "selected-bible-verses.firebaseapp.com",
        databaseURL: "https://selected-bible-verses.firebaseio.com",
        projectId: "selected-bible-verses",
        storageBucket: "selected-bible-verses.appspot.com",
        messagingSenderId: "292804202805",
        appId: "1:292804202805:web:f4a524fc7cae4647a73c7c",
      };
      // Initialize Firebase
firebase.initializeApp(firebaseConfig);
      
      const db = firebase.firestore();
    // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      }
    }
  };



var bibleBook = 0;
var bibleChapter = 0;
var quoteHeader = "";
var quote = "";
var response = "";
const quoteBtn = document.querySelector(".buttonGetQuote");
const nextVerseBtn = document.querySelector(".nextVerse");
const backVerseBtn = document.querySelector(".backVerse");
const nextChapterBtn = document.querySelector(".nextChapter");
const prevChapterBtn = document.querySelector(".prevChapter");
const copyVerseBtn = document.getElementById("copyVerse");
// const copyVerseBtn = document.querySelector(".copyVerse");
const content = document.querySelector(".content");
const content1 = document.querySelector(".content1");
const contentHeader = document.querySelector(".quoteHeader");
const URL =
  "http://adsitecreator-com.stackstaging.com/BibleQuoter/KJVBible.json";
//const URL = "http://proverbs1816.com/KJVBible.html";

 const ui = new firebaseui.auth.AuthUI(firebase.auth());

  // Listen to RSVP button clicks
  startRsvpButton.addEventListener('click', () => {
    if (firebase.auth().currentUser) {
      // User is signed in; allows user to sign out
      firebase.auth().signOut();
    }
    else {
      // No user is signed in; allows user to sign in
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });
// Listen to the current Auth state
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      startRsvpButton.textContent = "LOGOUT";
    }
    else {
      startRsvpButton.textContent = "Login";
    }
  });


// Navigation Buttons
copyVerseBtn.addEventListener("click", () => {
  copyVerseToFirebase()
  copyVerseBtn.innerHTML = "Copied!"
  copyVerseBtn.disabled = true
   
  
})


prevChapterBtn.addEventListener("click", () => {
  bibleChapter = bibleChapter - 1;
  displayChapterVerse();
});

nextChapterBtn.addEventListener("click", () => {
  bibleChapter = bibleChapter + 1;
  displayChapterVerse();
});

nextVerseBtn.addEventListener("click", () => {
  bibleVerse = bibleVerse + 1;
  displayChapterVerse();
});

backVerseBtn.addEventListener("click", () => {
  bibleVerse = bibleVerse - 1;
  displayChapterVerse();
});

quoteBtn.addEventListener("click", () => {
  getData(URL);
});

function getData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return;
    if (xhr.status === 200) {
      response = JSON.parse(xhr.responseText);

      // Turn on Bible Nav Buttons
      document.getElementById("Buttons").style.display = "inline";
      window.scrollBy(-75, 200);

      // Get a random Book
      numberofBooksBible = Object.keys(response.books).length;

      pickRandomBook();
      // Get a random chapter based on book
      amountOfChapters = Object.keys(response.books[bibleBook].chapters).length;
      bibleChapter = Math.floor(Math.random() * amountOfChapters);

      //Get a random verse based on the chapter
      amountOfVerses = Object.keys(
        response.books[bibleBook].chapters[bibleChapter].verses
      ).length;
      bibleVerse = Math.floor(Math.random() * amountOfVerses);

      displayChapterVerse();
    } else console.log("no");
  };
}
function pickRandomBook() {
  // bibleBook = Math.floor(Math.random() * 66);
  bibleBook = document.getElementById("myList").value;
  if (bibleBook > 38) {
    document.getElementById("myImage").src = "./Jesus.jpg";
  } else {
    document.getElementById("myImage").src = "./Moses.jpg";
  }
}
function displayChapterVerse() {
  quoteHeader =
    response.books[bibleBook].chapters[bibleChapter].verses[bibleVerse].name;
  quote =
    response.books[bibleBook].chapters[bibleChapter].verses[bibleVerse].text;
  copyVerseBtn.innerHTML = "Copy"
  copyVerseBtn.disabled = false

  // content.textContent = quote;
  contentHeader.textContent = quoteHeader;
  // Get a differnt translation
  var forNewVersion = "https://bible-api.com/" + quoteHeader;
  getDiffVersion(forNewVersion);
}
// function getlengthsofItems() {
//   numberofBooksBible = (Object.keys(response.books)).length

// }

function getDiffVersion(url1) {
  const xhr1 = new XMLHttpRequest();
  xhr1.open("GET", url1);
  xhr1.send();
  xhr1.onreadystatechange = function () {
    if (xhr1.readyState != 4) return;
    if (xhr1.status === 200) {
      response1 = JSON.parse(xhr1.responseText);
      console.log(response1.text);
      content1.textContent = response1.text;
    }
  };
}

function copyVerseToFirebase() {
  
 /*  database.ref("studyverse").push({
    name: quoteHeader,
    message: quote */
    /* Firebase */
  db.collection('studyverse').add({
        user: firebase.auth().currentUser.displayName,
        userId: firebase.auth().currentUser.uid,
        name: quoteHeader,
        message: quote


  })
}

