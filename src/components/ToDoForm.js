import React, { useState, useEffect, useRef } from "react";

function ToDoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : ""); // if we do not write this if when we want to update a todo text value has disappeared and we need to write it again.
  // input is the value of the input form
  // setInput is function that update the input field

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  // e = event
  const handleChange = (e) => {
    // handleChange is used to change input text, actually makes the currently entered text visible.
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // I create props because I want to reuse this function on more buttons
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput(""); // setInput('') used in handleSubmit reset the input field and make it empty when submit button is pressed
  };
  // handleSubmit is used to not refesh the page when click on the submit button

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Edit your item"
            value={input}
            name="text"
            className="todo-input edit"
            onChange={handleChange}
            ref={inputRef}
          ></input>
          <button className="todo-button edit">Update todo</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a todo"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          ></input>
          <button className="todo-button">Add todo</button>
        </>
      )}
    </form>
  );
}
export default ToDoForm;
