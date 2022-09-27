import React, { useState, useContext } from "react";
import Header from "./Header.js";
import { TimeDispatch } from "./Timecontext.js";
import styles from "../styles/Time.module.css";

const initial = {
  name: "",
  date: "",
  description: "",
  status: "list",
};

function Timeform() {
  const [timeline, setTimeline] = useState(initial);

  const dispatch = useContext(TimeDispatch);
  const { name, date, description, status } = timeline;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [name, date, description, status];

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      const lists = {
        name,
        date,
        description,
        status,
      };
      dispatch({ type: "add", data: lists });
      setTimeline(initial);
      alert("Timeline added");
    } else {
      alert("Please fill out all the fields.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      default:
        setTimeline((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };
  return (
    <div>
      <Header />
      <form className={styles.timeform} onSubmit={handleOnSubmit}>
        <h1>Add Timeline</h1>
        <input
          type="date"
          name="date"
          value={timeline.date}
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          name="name"
          value={timeline.name}
          placeholder="Enter name of the activity"
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          name="description"
          value={timeline.description}
          placeholder="Enter description of the activity"
          onChange={handleInputChange}
        ></input>
        <select
          name="status"
          value={timeline.status}
          onChange={handleInputChange}
        >
          <option value="List">List</option>
          <option value="In progress">In Progress</option>
          <option value="Done">Done</option>
          <option value="Canceled">Canceled</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Timeform;
