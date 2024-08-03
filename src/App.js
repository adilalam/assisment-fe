import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CardComponent from "./components/CardComponent";
import "./style.css";
import PopupComponent from "./components/PopupComponent";

function App() {
  const [list, setList] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  async function getListData() {
    const token = localStorage.getItem("authToken");

    if (!token) {
      // Handle no token case
      console.log("No token found");
      return;
    }

    try {
      const { data } = await axios.get("http://localhost:4001/getLists", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setList(data.data);
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error saving data:", error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }

    getListData();
  }, []);

  const handleAddItem = async (taskName, list_id) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.post(
        "http://localhost:4001/createTask",
        {
          taskName,
          list_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
      getListData();
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error saving data:", error);
    }
  };

  const handleDeleteList = useCallback(async (list_id) => {
    const token = localStorage.getItem("authToken");

    if (window.confirm("Are you sure you want to delete this List?")) {
      try {
        await axios.delete(`http://localhost:4001/deleteList/${list_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(response.data);
        getListData();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  }, []);

  const handleDeleteTask = useCallback(async (task_id) => {
    const token = localStorage.getItem("authToken");

    if (window.confirm("Are you sure you want to delete this Task?")) {
      try {
        await axios.delete(`http://localhost:4001/deleteTask/${task_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(response.data);
        getListData();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  }, []);

  const handleCompleteTask = useCallback(async (task_id, isCompleted) => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.post(
        `http://localhost:4001/completeTask/${task_id}`,
        {
          isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
      getListData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, []);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    getListData();
  };

  async function logout() {
    localStorage.removeItem("authToken");
    setIsLogin(false);
  }

  return (
    <div className="App">
      <header className="header">
        <div className="logo">Todo List</div>
        <div className="login-logout">
          {isLogin ? (
            <button className="login-button" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
          )}
        </div>
      </header>
      {isLogin && (
        <>
          <div className="card-grid">
            <button className="button" onClick={openPopup}>
              New List
            </button>
            <PopupComponent isOpen={isPopupOpen} onClose={closePopup} />
          </div>
          <div className="card-grid">
            {list &&
              list.map((listData, i) => {
                return (
                  <CardComponent
                    key={i}
                    handleAddItem={handleAddItem}
                    items={listData}
                    handleDeleteList={handleDeleteList}
                    handleDeleteTask={handleDeleteTask}
                    handleCompleteTask={handleCompleteTask}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
