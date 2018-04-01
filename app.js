const Tesseract = require('tesseract.js');

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

  Tesseract.recognize(result)
    .progress((message) => {
      text.innerHTML = message.text;
    })
    .then((result) => {
      text.innerHTML = result.text;
    });

  entry.appendChild(img);
  entry.appendChild(text);
  document.getElementById('display').appendChild(entry);
}

document.getElementById('submit').addEventListener('click', init);
