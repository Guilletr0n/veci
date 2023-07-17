class ItemManager {
  constructor() {
      this.values = [];
      this.items = [];
      this.selectedItems = [];
      this.undoItems = [];
  }

  addItem(textValue) {
    if(textValue.length < 1) {
      warning.classList.remove('--is-hidden');
      return;
    }
      const idx = this.values.push(textValue);
      const listItem = document.createElement('li');
      listItem.setAttribute('id', `item-${idx}`);
      listItem.classList.add('stored-item');
      listItem.textContent = textValue;
      store.appendChild(listItem);
      this.items.push(listItem);
      inputText.value = "";

      listItem.addEventListener('click', (evt) => {
          this.selectItem(evt.target);
      });
  }

  deleteItems() {
      this.undoItems = [...this.items];
      this.items = this.items.filter(item => !this.selectedItems.includes(item));
      this.redrawItems();
      this.selectedItems = [];
  }
  selectItem(_item) {
      if(this.selectedItems.find(item => item == _item)) {
          _item.classList.remove('is--selected');
          this.selectedItems = this.selectedItems.filter(item => item != _item);
      } else {
          _item.classList.add('is--selected');
          this.selectedItems.push(_item);
      }
  }

  undoDelete() {
      this.items = [...this.undoItems];
      this.redrawItems();
  }

  redrawItems() {
      store.innerHTML = '';
      this.items.forEach(element => {
          store.appendChild(element);
          element.classList.add('stored-item');
      });
  }
}

const btnAddBtn = document.querySelector('button#btnAddItem.btn.add');
const inputText = document.querySelector('#add_text');
const store = document.querySelector('#store');
const overlay = document.querySelector('#overlay');
const btnOpenModal = document.querySelector('#btnOpenModal');
const btnCloseModal = document.querySelector('#btnCloseModal');
const btnDeleteItems = document.querySelector('#btnDeleteItems');
const btnUndo = document.querySelector('#btnUndo');
const warning = document.querySelector('#warning');
const itemManager = new ItemManager();

// Event listeners
btnAddItem.addEventListener('click', () => itemManager.addItem(inputText.value));
inputText.addEventListener('keydown', (evt) => {
  warning.classList.add('--is-hidden');
  if (evt.keyCode == 13) {
      itemManager.addItem(inputText.value);
  }
});
btnOpenModal.addEventListener('click', () => {
  overlay.classList.add('is--open');
  inputText.focus();
});
btnCloseModal.addEventListener('click', () => overlay.classList.remove('is--open') );
btnDeleteItems.addEventListener('click', () => itemManager.deleteItems());
btnUndo.addEventListener('click', () => itemManager.undoDelete());
