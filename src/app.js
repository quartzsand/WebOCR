const Tesseract = require('tesseract.js');
let submit = document.getElementById('submit');
const languages = {
  English: 'eng',
  Spanish: 'spn',
  French: 'fra',
  Russian: 'rus',
  Chinese: 'chi_sim',
  Arabic: 'arb',
  German: 'deu',
  Hebrew: 'heb',
  Japanese: 'jpn',
  Korean: 'kor',
  Turkish: 'tur'
};

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
  console.log('Opened IndexedDB database.');
  db = event.target.result;
};

// ////////////////////////////////////
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker
//       .register('./sw.js')
//       .then((registration) => {
//         console.log('Service Worker Registered');
//       })
//       .catch((err) => {
//         console.error('Error registering service worker!');
//       });
//   });
// }

function init() {
  const file = document.getElementById('file').files[0];
  let language = document.getElementById('languageform').value;

  document.getElementById('filename').innerHTML = '';

  if (file.type.match(/image.*/)) {
    const reader = new FileReader();
    reader.onload = (e) => {
      buildEntry(reader.result, language);
    };
    reader.readAsDataURL(file);
  } else if (file.type.match(/application.pdf/)) {
    console.log('pdf');
  } else {
    console.log('error');
  }
  document.getElementById('file').value = '';
}

function buildEntry(image, language) {
  let box = document.createElement('div');
  box.className = 'box';

  let article = document.createElement('article');
  article.className = 'media';

  let media = document.createElement('div');
  media.className = 'media-left';

  let figure = document.createElement('figure');
  figure.className = 'image is-64x64';

  let mediaContent = document.createElement('div');
  mediaContent.className = 'media-content';

  let content = document.createElement('div');
  content.className = 'content';

  let text = document.createElement('p');

  let img = new Image();
  img.className = 'thumb';
  img.src = image;

  // img.addEventListener('click', (e) => {
  //   if (e.target.style.width === '100%') {
  //     e.target.style.width = '15%';
  //   } else {
  //     e.target.style.width = '100%';
  //   }
  // });

  box.appendChild(article);
  article.appendChild(media);
  media.appendChild(figure);
  figure.appendChild(img);
  article.appendChild(mediaContent);
  mediaContent.appendChild(content);
  content.appendChild(text);

  let mylang = languages[language];
  console.log(mylang);
  Tesseract.recognize(image, { lang: mylang })
    .progress((message) => {
      submit.className = 'button is-loading';
    })
    .then((result) => {
      submit.className = 'button';
      text.innerHTML = result.text;
      document
        .getElementById('display')
        .appendChild(box)
        .scrollIntoView({ block: 'end', behavior: 'smooth' });
    })
    .catch((result) => {
      submit.className = 'button';
      text.innerHTML = 'This image could not be processed correctly!';
      document.getElementById('display').appendChild(box);
    });
}

var file = document.getElementById('file');
file.onchange = function() {
  if (file.files.length > 0) {
    document.getElementById('filename').innerHTML = file.files[0].name;
  }
};

document.getElementById('submit').addEventListener('click', init);
