const btnAddBtn = document.querySelector('button#btnAddItem.btn.add');
const inputText = document.querySelector('#add_text');
const store = document.querySelector('#store');
const overlay = document.querySelector('#overlay');
const btnOpenModal = document.querySelector('#btnOpenModal');
const btnCloseModal = document.querySelector('#btnCloseModal');
const btnDeleteItems = document.querySelector('#btnDeleteItems');
const btnUndo = document.querySelector('#btnUndo');
const values = [];
let lastDeleted = '';
let items = [];
let selectedItems = [];
let undoItems = [];

btnAddItem.addEventListener('click', () => {
  addItem();
});

inputText.addEventListener('keydown', (evt) => {
  if (evt.keyCode == 13) {
    addItem();
  }
});

btnOpenModal.addEventListener('click', () => {
  overlay.classList.add('is--open');
  inputText.focus();
});

btnCloseModal.addEventListener('click', () => {
  overlay.classList.remove('is--open')
});

btnDeleteItems.addEventListener('click', () => {
  deleteItems();
});

btnUndo.addEventListener('click', () => {
  store.innerHTML = '';
  Array.from(undoItems).forEach(element => {
    store.appendChild(element);
    element.setAttribute('class', 'stored-item');
  });
}); 

// Add new items to the list

function addItem() {
  const textValue = inputText.value;
  let idx = values.push(textValue);
  const listItem = document.createElement('li');
  listItem.setAttribute('id', `item-${idx}`);
  listItem.setAttribute('class', `stored-item`);
  listItem.textContent = textValue;
  store.appendChild(listItem);
  inputText.value = '';
  items = document.querySelectorAll('.stored-item');
  listItem.addEventListener('click', (evt) => {
    selectItem(evt.target);
  });
}

// Delete selected items

function deleteItems() {
  undoItems = [...Array.from(store.children)];
  let updatedItems = Array.from(store.children).filter(
    item => !selectedItems.includes(item)
  );
    
  store.innerHTML = '';
  updatedItems.forEach(element => {
    store.appendChild(element);
  });
  selectedItems = [];
}

function selectItem(_item) {
  // Checks if the item was already on the selection list
  if(selectedItems.find(item => item == _item)) {
    _item.classList.remove('is--selected');
    // Removes item from the selection list
    selectedItems.forEach((item, idx, arr) => {
      arr.splice(idx, 1);
    });
  } else {
    _item.setAttribute('class', 'is--selected');
    selectedItems.push(_item);
  }
}