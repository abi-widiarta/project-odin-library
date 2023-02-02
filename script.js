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
  createNewBook(inputTitle.value, inputAuthor.value, inputPages.value, inputCheckbox.checked);
  closeModal();
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
  modal.classList.toggle("pointer-events-none");
  modal.style.backgroundColor = "rgba(0,0,0,0)";
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  inputCheckbox.checked = false;
};

const openModal = () => {
  modalInner.classList.add("scaleUp");
  modal.style.backgroundColor = "rgba(0,0,0,0.2)";
  modal.classList.toggle("pointer-events-none");
};

const createNewBook = (title, author, pages, read) => {
  const newBook = new Book(title, author, pages, read);

  addBookToLibrary(newBook);
  appendBook(myLibrary);
};

// for data
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function appendBook(myLibrary) {
  bookContainer.innerHTML = "";

  let id = 0;
  myLibrary.forEach((element) => {
    const newCard = document.createElement("div");
    // newCard.classList.add("w-1/4", "px-4", "mb-4");
    newCard.classList.add("mb-4", "h-full");

    newCard.innerHTML = `
    <div class="flex flex-col space-y-6 rounded-sm border border-slate-500 bg-primary p-6 text-center text-white">
          <h2 class="text-xl font-bold">${element.title}</h2>
          <p>${element.author}</p>
          <p>${element.pages}</p>
          <a class="cursor-pointer select-none" onclick=(changeRead(event)) href="#">${element.read ? "Yes,It's been read" : "Not read yet"}</a>
          <a onclick=(removeBook(event)) href="#">Remove</a>
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
};

const removeBook = (event) => {
  console.log(event.target.parentNode.parentNode.id);
  myLibrary.splice(event.target.parentNode.parentNode.id, 1);

  appendBook(myLibrary);
};
