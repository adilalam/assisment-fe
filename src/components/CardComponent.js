import React, { useState } from 'react';
import Task from './Task';

const CardComponent = ({items, handleAddItem, handleDeleteList, handleDeleteTask, handleCompleteTask}) => {
  
  const [newItem, setNewItem] = useState('');

  function addItem() {
    handleAddItem(newItem, items.id);
    setNewItem('');
  }

   return (
    <div className="card">
      <button className="delete-button" onClick={() => handleDeleteList(items.id)}>×</button>
      <div className='card-title'>{items.listName}</div>
      <div className="card-body">
        <ul>
          {items.Tasks && items.Tasks.map((item, index) => (
            <Task 
              key={index} 
              item={item} 
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
             />
          ))}
        </ul>
      </div>
      <div className="card-footer">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
        />
        <button onClick={() => addItem(newItem, items.id)}>Save</button>
      </div>
    </div>
  );
};

export default React.memo(CardComponent);
