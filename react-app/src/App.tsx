import React, { useState } from 'react';
import Modal from 'react-modal';
import InputModal from './InputModal';

type Item = {
  id: number;
  text: string;
  selected: boolean;
};

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [undoItems, setUndoItems] = useState<Item[]>([]);
  const [placeholder, setPlaceholder] = useState<string>("Add an item...");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
    if (event.target.value.trim().length > 0) {
      setPlaceholder("Type the text here..."); 
    }
  }

  const addItem = (input:string) => {
    if(input.trim().length > 0) {
      setItems([...items, { id: items.length, text: input, selected: false }]);
    } else {
      setPlaceholder('Please, write some value before adding to the list');
    }
    setInput('');
    setModalIsOpen(false)
  }

  const deleteItems = () => {
    const updatedItems = items.filter(item => !selectedItems.includes(item.text));
    setUndoItems([...items]);
    setItems(updatedItems);
    setSelectedItems([]);
  }

  const handleUndo = () => {
    setItems(undoItems);
    setUndoItems([]);
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleSelectedItems = (item: Item) => {
    if(selectedItems.includes(item.text)) {
      setSelectedItems(selectedItems.filter(itemText => itemText !== item.text));
      item.selected = false;
    } else {
      item.selected = true;
      setSelectedItems([...selectedItems, item.text]);
    }
  }

  return (
    <div className="app">
      <h1>This is a technical proof</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur impedit nostrum incidunt labore cumque. Possimus, ad placeat! Exercitationem dicta nemo unde perspiciatis, facilis cum, autem possimus a at, consectetur accusantium.</p>
      
      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Item Input Modal"
        overlayClassName={"reactModal__overlay"}
        className={"reactModal__content"}>
        <InputModal
           addInput={(value) => addItem(value)}
           handleSelectedItems={(item)=>addItem(item)}
           placeholder={placeholder}
           handleModal={()=>closeModal()}
         />
      </Modal>
      <ul className="list-stored">
        {items.map((item) => (
          <li
           key={item.id}
           onClick={() => handleSelectedItems(item)}
           className={item.selected ? 'is--selected' : ''}
           >{item.text}
          </li>
        ))}
      </ul>
      <div className="controls">
        <button className="btn" onClick={deleteItems}>delete</button>
        <button className="btn" onClick={handleUndo}><span className="icon-undo"></span></button>
        <button
          className="btn btn-color-inv"
          onClick={() => setModalIsOpen(true)}
          >Add
        </button>
      </div>
    </div>
  );
};

export default App;