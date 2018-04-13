const Tesseract = require('tesseract.js');

//////////////////////////////////////
window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction || { READ_WRITE: 'readwrite' };

window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
  console.log("Your browser doesn't support a stable version of IndexedDB.");
}

let db;
let request = indexedDB.open('OCR', 1);
request.onerror = (event) => {
  console.log('Error opening database!');
};
request.onsuccess = (event) => {
  db = event.target.result;
};

//////////////////////////////////////
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => {
        console.log('Service Worker Registered');
      })
      .catch((err) => {
        console.error('Error registering service worker!');
      });
  });
}

function init() {
  const file = document.getElementById('file').files[0];
  const lang = document.querySelectorAll('.lang');

  let options = '';
  lang.forEach((elem) => {
    if (elem.checked) {
      options += elem.id;
    }
  });

  console.log(options);
  if (file.type.match(/image.*/)) {
    const reader = new FileReader();
    reader.onload = (e) => {
      buildEntry(reader.result);
    };
    reader.readAsDataURL(file);
  } else if (file.type.match(/application.pdf/)) {
    console.log('pdf');
  } else {
    console.log('error');
  }
  document.getElementById('file').value = '';
}

function openSpinner() {
  document.getElementById('spinner').style.display = 'block';
  document.getElementById('fade').style.display = 'block';
}

function closeSpinner() {
  document.getElementById('spinner').style.display = 'none';
  document.getElementById('fade').style.display = 'none';
}

function buildEntry(result) {
  let entry = document.createElement('div');
  entry.className = 'entry';

  let text = document.createElement('div');
  text.className = 'text';

  let img = new Image();
  img.className = 'thumb';
  img.src = result;

  img.addEventListener('click', (e) => {
    if (e.target.style.width === '100%') {
      e.target.style.width = '15%';
    } else {
      e.target.style.width = '100%';
    }
  });

  openSpinner();
  Tesseract.recognize(result)
    .progress((message) => {
      console.log(messasge.text);
      // text.innerHTML = message.text;
    })
    .then((result) => {
      closeSpinner();
      text.innerHTML = result.text;
    });

  entry.appendChild(img);
  entry.appendChild(text);
  document.getElementById('display').appendChild(entry);
}

document.getElementById('submit').addEventListener('click', init);
