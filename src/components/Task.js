import React from 'react';

const Task = ({ item, handleDeleteTask, handleCompleteTask }) => {
  
  return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className={`task ${item.isCompleted ? 'completed' : ''}`}>
                <input 
                    type="checkbox" 
                    checked={item.isCompleted}
                    onChange={() => handleCompleteTask(item.id, item.isCompleted)}
                />
                <span>{item.taskName}</span>
            </div>
            <button className="delete-button-item" onClick={() => handleDeleteTask(item.id)}>×</button>
        </div>
  );
};

export default React.memo(Task);
