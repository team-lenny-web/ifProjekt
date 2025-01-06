let draggedElement = null;

function addImage() {
  const imageUrl = document.getElementById('image-url').value;
  if (!imageUrl) {
    alert('Bitte geben Sie eine gültige Bild-URL ein.');
    return;
  }

  const img = document.createElement('img');
  img.src = imageUrl;
  img.className = 'image-item';
  img.style.top = '10px';
  img.style.left = '10px';
  img.style.width = '200px';

  img.draggable = true;
  img.ondragstart = (e) => {
    draggedElement = img;
  };
  img.ondragend = (e) => {
    draggedElement = null;
  };

  img.onclick = () => {
    if (confirm('Möchten Sie dieses Bild löschen?')) {
      img.remove();
      saveBoard(); // Aktualisiert das gespeicherte Board nach dem Löschen
    }
  };

  const board = document.getElementById('vision-board');
  board.appendChild(img);
}

document.getElementById('vision-board').ondragover = (e) => {
  e.preventDefault();
  if (draggedElement) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    draggedElement.style.left = `${x - draggedElement.offsetWidth / 2}px`;
    draggedElement.style.top = `${y - draggedElement.offsetHeight / 2}px`;
  }
};

function saveBoard() {
  const board = document.getElementById('vision-board');
  const items = board.querySelectorAll('.image-item');
  const savedImages = Array.from(items).map(item => ({
    src: item.src,
    top: item.style.top,
    left: item.style.left,
    width: item.style.width
  }));

  localStorage.setItem('visionBoard', JSON.stringify(savedImages));
  const message = document.getElementById('saved-message');
  message.style.display = 'block';
  setTimeout(() => message.style.display = 'none', 3000);
}

function loadBoard() {
  const savedImages = JSON.parse(localStorage.getItem('visionBoard')) || [];
  const board = document.getElementById('vision-board');
  savedImages.forEach(imageData => {
    const img = document.createElement('img');
    img.src = imageData.src;
    img.className = 'image-item';
    img.style.top = imageData.top;
    img.style.left = imageData.left;
    img.style.width = imageData.width;

    img.draggable = true;
    img.ondragstart = (e) => {
      draggedElement = img;
    };
    img.ondragend = (e) => {
      draggedElement = null;
    };

    img.onclick = () => {
      if (confirm('Möchten Sie dieses Bild löschen?')) {
        img.remove();
        saveBoard(); // Aktualisiert das gespeicherte Board nach dem Löschen
      }
    };

    board.appendChild(img);
  });
}

window.onload = loadBoard;
