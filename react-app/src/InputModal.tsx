import React, { useState } from 'react';
import { isPropertySignature } from 'typescript';

interface ItemProps {
  addInput:(value:string) => void;
  handleSelectedItems:(value:string) => void;
  handleModal:(event: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder:string;
}

const InputModal = ({addInput, handleSelectedItems, handleModal}:ItemProps) => {
  const [placeholder, setPlaceholder] = useState<string>("Type the text here...");
  const [userInput, setUserInput] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  }

  return (
  <div className="modal-layout">
    <p>Add item to list...</p>
    <input
      type="text"
      value={userInput}
      onChange={handleInputChange}
      placeholder={placeholder} />
    <div className="controls">
      <button
        className="btn"
        onClick={() => handleSelectedItems(userInput)}
      >Add Item</button>

      <button
        className="btn"
        onClick={handleModal}
      >Close</button>
    </div>
  </div>
  )};

export default InputModal;

