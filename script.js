const uploadBtn = document.getElementById("uploadBtn");
const imageInput = document.getElementById("imageInput");
const tagInput = document.getElementById("tagInput");
const userInput = document.getElementById("userInput");
const searchInput = document.getElementById("searchInput");
const photoFeed = document.getElementById("photoFeed");
const themeToggle = document.getElementById("themeToggle");

let savedPhotos = JSON.parse(localStorage.getItem("taggyUploads") || "[]");

function savePhotos() {
  localStorage.setItem("taggyUploads", JSON.stringify(savedPhotos));
}

function displayPhotos(filter = "") {
  photoFeed.innerHTML = "";
  savedPhotos
    .filter(p => p.tag.toLowerCase().includes(filter.toLowerCase()))
    .forEach(photo => {
      const card = document.createElement("div");
      card.className = "photo-card";

      const img = document.createElement("img");
      img.src = photo.url;

      const tag = document.createElement("p");
      tag.textContent = photo.tag;

      const user = document.createElement("p");
      user.textContent = photo.user;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => {
        savedPhotos = savedPhotos.filter(p => p !== photo);
        savePhotos();
        displayPhotos(searchInput.value);
      };

      card.appendChild(img);
      card.appendChild(tag);
      card.appendChild(user);
      card.appendChild(delBtn);
      photoFeed.appendChild(card);
    });
}

uploadBtn.onclick = () => {
  const file = imageInput.files[0];
  const tag = tagInput.value.trim();
  const user = userInput.value.trim();

  if (!file || !tag || !user) {
    alert("Fill all fields!");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const newPhoto = { url: reader.result, tag, user };
    savedPhotos.unshift(newPhoto);
    savePhotos();
    displayPhotos(searchInput.value);
    imageInput.value = "";
    tagInput.value = "";
    userInput.value = "";
  };
  reader.readAsDataURL(file);
};

searchInput.oninput = () => displayPhotos(searchInput.value);

// Dark mode toggle
themeToggle.onchange = () => {
  document.body.classList.toggle("dark");
};

// Load on start
displayPhotos();