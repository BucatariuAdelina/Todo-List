import React, { useState } from "react";
import ToDo from "./ToDo";
import ToDoForm from "./ToDoForm";

function ToDoList() {
  const [todos, setTodos] = useState([]); // I used map on todos we initializate the useState with an empty array because map works only on arrays

  // /^\s*$/ is a RegExp for empty string or string with only spaces
  // ^ asserts position at start of the string
  // \s* matches any whitespace character (equal to [\r\n\t\f\v ])
  // * Quantifier — Matches between zero and unlimited times, as many times as possible, giving back as needed (greedy)
  // $ asserts position at the end of the string, or before the line terminator right at the end of the string (if any)

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    // addTodo is a function that has one parameter ( todo)
    // first time I check if the edited text is empty or just spaces
    // if the todo is valid and doesn`t have blank spaces or isn`t null then we create a new todo
    // [todo, ...todos] - todo is the current todo which will be added to the todos array
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
    // updateTodo is a function how use two parameters (todoId and newValue)
    // first time I check if the edited text is empty or just spaces
    // if entered text is valid then I set the todos value
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
    // removeTodo function has one parameter, the id of todo we want to remove
    // [...todos].filter - return the array element how meet the condition specified
    // removeArr get the value of the todo with the id equal with the id parameter
    // setTodos with that todos who we want to remove
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
    // completeTodo function has one parameter
    // updatedTodos get the value of an modified array
    // todos array is traversed and every element is checked
    // if the id of todos element is equal with the id given like function parameter then the todo state is changed opposite.
    // this state is used in Todo.js for todo objet className
  };

  return (
    <div>
      <h1>What`s the Plan for Today?</h1>
      <ToDoForm onSubmit={addTodo} />{" "}
      {/*when press Add Todo button the addTodo function is called  */}
      <ToDo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}
export default ToDoList;
