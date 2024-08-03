import React, { useState } from "react";
import axios from "axios";

const PopupComponent = ({ isOpen, onClose }) => {
  const [listName, setListName] = useState("");

  const handleSave = async () => {
    // alert(`Saved: ${listName}`);
    const token = localStorage.getItem("authToken");

    try {
      await axios.post(
        "http://localhost:4001/createList",
        {
          listName: listName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
      setListName("");
      onClose();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleClose = () => {
    setListName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add New List</h2>
        <div className="card-footer">
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="List Name"
          />
        </div>
        <div className="popup-buttons">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
