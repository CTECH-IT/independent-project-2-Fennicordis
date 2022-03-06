const grid = document.querySelector('.grid');

function displayGrid(columns, images) {
  grid.innerHTML = '';
  for (let col = 0; col < columns; col++) {
    const column = document.createElement('div');
    column.classList.add('column');
    for (let idx = 0; idx < images.length; idx++) {
      if ((idx % columns) == col) {
        const div = document.createElement('div');
        div.classList.add('image');
        const img = document.createElement('img');
        img.src = images[idx];
        div.appendChild(img);
        
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        div.appendChild(overlay);
        
        column.appendChild(div);
      }
    }
    grid.appendChild(column);
  }
}

/* Open color */
const colors = [
  'ff8787',  /* red */
  'f783ac',  /* pink */
  'da77f2',  /* grape */
  '9775fa',  /* violet */
  '748ffc',  /* indigo */
  '4dabf7',  /* blue */
  '3bc9db',  /* cyan */
  '38d9a9',  /* teal */
  '69db7c',  /* green */
  'a9e34b',  /* lime */
  'ffd43b',  /* yellow */
  'ffa94d'   /* orange */
];

const sizes = [
  '150x150',
  '150x120',
  '100x140',
  '120x150',
  '150x100',
  '100x150',
  '160x90',
  '160x120',
  '120x160',
  '140x100'
];

function generateImages(count) {
  const images = [];
  for (let i = 0; i < count; i++) {
    const rgb = colors[i % colors.length];
    const dims = sizes[i % sizes.length];
    const url = `https://placehold.jp/${rgb}/ffffff/${dims}.png?text=${i+1}`;
    images.push(url);
  }
  return images;
}

function createImages(count) {
  let all = [];
  for (let res = count; res > 0; res -= 12) {
    let n = (res < 12)? res: 12;
    let images = generateImages(n);
    all = all.concat(images);
  }
  return all;
}


const images = createImages(52);

const layoutConfig = [
  {query: '(min-width: 601px)', column: 4},
  {query: '(min-width: 401px) and (max-width: 600px)', column: 3},
  {query: '(min-width: 361px) and (max-width: 400px)', column: 2},
  {query: '(max-width: 360px)', column: 1},
];

layoutConfig.forEach(function(conf) {
  const mql = window.matchMedia(conf.query);
  function handler(mql) {
    if (mql.matches) {
      displayGrid(conf.column, images);
    }
  }
  handler(mql);
  mql.addEventListener(handler);
});
