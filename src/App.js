import { useState } from "react";

function App() {
  const [todoDB, setTodoDB] = useState([]);
  const [inputValue, setInputValue] = useState();
  const writeTodoText = (e) => {
    setInputValue(e.target.value);
  };
  const addNewTodo = (e) => {
    e.preventDefault();
    const newID = new Date().getTime();
    setTodoDB([
      ...todoDB,
      { id: newID, content: inputValue, isCompleted: false },
    ]);
    setInputValue("");
  };

  const completeCheck = (e) => {
    todoDB.filter((data) =>
      data.id == e.target.parentElement.id
        ? data.isCompleted
          ? (data.isCompleted = false)
          : (data.isCompleted = true)
        : null
    );
    console.log(todoDB);
  };

  const deleteTodo = (e) => {
    setTodoDB(todoDB.filter((data) => e.target.parentElement.id != data.id));
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={addNewTodo}>
        <input
          onChange={writeTodoText}
          value={inputValue}
          type="text"
          placeholder="할 일을 입력해 주세요."
        />
        <button>추가</button>
      </form>
      <ul>
        {todoDB.map((todoData) => (
          <li id={todoData.id} data-iscompleted={todoData.isCompleted}>
            <button onClick={completeCheck}>
              {!todoData.isCompleted ? `🤔` : `😍`}
            </button>
            {todoData.content}
            <button onClick={deleteTodo}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
