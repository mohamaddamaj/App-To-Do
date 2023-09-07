import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [tasks, setTasks] = useState([
    { text: "Learn JavaScript", completed: false },
    { text: "Learn React", completed: false },
    { text: "Build a React App", completed: false },
  ]);

  const [taskText, setTaskText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (taskText.trim() !== "") {
      setTasks([...tasks, { text: taskText, completed: false }]);
      setTaskText("");
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const searchTasks = () => {
    // Filter tasks based on the searchQuery
    const filteredTasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTasks(filteredTasks);
  };
  return (
    <div className="App">
      <h1>THINGS TO DO</h1>
      <div>
        <input
          type="text"
          placeholder="Add New"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        {/* <button onClick={addTask}>
          <FontAwesomeIcon icon={faPlus} /> Add
        </button> */}
      </div>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <ul>
        {tasks
          .filter((task) => {
            if (filter === "all") {
              return true;
            } else if (filter === "active") {
              return !task.completed;
            } else if (filter === "completed") {
              return task.completed;
            }
            return false;
          })
          .filter((task) =>
            task.text.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />
              <span className={task.completed ? "completed" : ""}>
                {task.text}
              </span>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
      </ul>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-icons">
          <button onClick={addTask}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button onClick={searchTasks}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="item-count">{tasks.length} items left</div>
        <div className="filters">
          <button
            onClick={() => setFilter("all")}
            className={filter === "all" ? "active" : ""}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={filter === "active" ? "active" : ""}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "active" : ""}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("")}
            className={filter === "" ? "clear-button" : ""}
          >
            Clear
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
