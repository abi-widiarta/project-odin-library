// select element yang dibutuhkan
const body = document.querySelector("body");
const btnAdd = document.querySelector("#btn-add");
const modal = document.querySelector("#modal");
const modalInner = document.querySelector("#modal-inner");
const inputTitle = document.querySelector("#input-title");
const inputAuthor = document.querySelector("#input-author");
const inputPages = document.querySelector("#input-pages");
const inputCheckbox = document.querySelector("#input-checkbox");
const btnSubmit = document.querySelector("#btn-submit");
const bookContainer = document.querySelector("#card-container");

let BookId = 0;

// event listener saat tombol add di klik maka akan
// 1. nambah class scaleUp
// 2. set warna bg modal setelah 300ms
btnAdd.addEventListener("click", () => {
  openModal();
});

// saat submit form, prevent default dan remove class scaleUp
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputTitle.value != "" && inputAuthor.value != "" && inputPages.value != "") {
    createNewBook(inputTitle.value, inputAuthor.value, inputPages.value, inputCheckbox.checked);
    closeModal();
  } else {
    alert("Please Fill The Required Field😊");
  }
});

// saat area diluar modal inner di klik maka modal akan close
modal.addEventListener("click", (e) => {
  if (!e.target.closest("#modal-inner")) {
    console.log("tes");
    closeModal();
  }
});

// fungsi tutup modal
const closeModal = () => {
  modalInner.classList.remove("scaleUp");
  modalInner.classList.add("scaleDown");
  modal.classList.toggle("pointer-events-none");
  modal.style.backgroundColor = "rgba(0,0,0,0)";
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  inputCheckbox.checked = false;
};

const openModal = () => {
  modalInner.classList.add("scaleUp");
  modalInner.classList.remove("scaleDown");
  modal.style.backgroundColor = "rgba(0,0,0,0.2)";
  modal.classList.toggle("pointer-events-none");
};

const createNewBook = (title, author, pages, read) => {
  const newBook = new Book(title, author, pages, read);

  addBookToLibrary(newBook);
  appendBook(myLibrary);
};

// for data

let myLibrary;
if (localStorage.getItem("myLib") != null) {
  myLibrary = JSON.parse(localStorage.getItem("myLib"));
  appendBook(myLibrary);
} else {
  myLibrary = [];
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// function addBookToLibrary(newBook) {
//   myLibrary.push(newBook);
// }

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  localStorage.setItem("myLib", JSON.stringify(myLibrary));
}

function appendBook(myLibrary) {
  bookContainer.innerHTML = "";

  let id = 0;
  myLibrary.forEach((element) => {
    const newCard = document.createElement("div");
    // newCard.classList.add("w-1/4", "px-4", "mb-4");
    newCard.classList.add("mb-4", "h-full");

    newCard.innerHTML = `
    <div class="flex h-full flex-col space-y-8 rounded-sm border border-slate-500 bg-primary p-6 text-center text-white">
          <h2 class="mb-8 text-xl font-bold">${element.title}</h2>
          <p class="mb-8" >${element.author}</p>
          <p class="mb-8">${element.pages}</p>
          <button class="cursor-pointer transition-all ${element.read ? "btn-read-true" : "btn-read-false"} bg-white mb-4 cursor-pointer select-none" onclick=(changeRead(event)) >${
      element.read ? "Yes,It's been read" : "Not read yet"
    }</button>
          <button class="cursor-pointer btn-remove bg-white" onclick=(removeBook(event)) href="#">Remove</butt>
        </div>
    `;
    newCard.id = id;
    id++;
    bookContainer.appendChild(newCard);
  });
}

const changeRead = (event) => {
  const elementId = event.target.parentNode.parentNode.id;
  myLibrary[elementId].read ? (myLibrary[elementId].read = false) : (myLibrary[elementId].read = true);
  appendBook(myLibrary);
  localStorage.setItem("myLib", JSON.stringify(myLibrary));
};

const removeBook = (event) => {
  myLibrary.splice(event.target.parentNode.parentNode.id, 1);

  appendBook(myLibrary);
  localStorage.setItem("myLib", JSON.stringify(myLibrary));
};
