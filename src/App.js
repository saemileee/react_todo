import { useState } from "react";

function App() {
  const [todoDB, setTodoDB] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [selectedTags, setSelectedTags] = useState([]);

  const selectTag = (e) => {
    setSelectedTags([
      ...selectedTags,
      { id: e.target.id, value: e.target.value },
    ]);
  };

  const writeTodoText = (e) => {
    setInputValue(e.target.value);
  };
  const addNewTodo = (e) => {
    e.preventDefault();
    const newID = new Date().getTime();
    setTodoDB([
      ...todoDB,
      {
        id: newID,
        content: inputValue,
        isCompleted: false,
        tags: selectedTags,
      },
    ]);
    setInputValue("");
    setSelectedTags([]);
  };

  const completeCheck = (e) => {
    setTodoDB(
      todoDB.map((todoData) => {
        if (todoData.id == e.target.parentElement.id) {
          return { ...todoData, isCompleted: !todoData.isCompleted };
        }
        return todoData;
      })
    );
  };

  const deleteTodo = (e) => {
    setTodoDB(todoDB.filter((data) => e.target.parentElement.id != data.id));
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={addNewTodo}>
        <select onChange={selectTag}>
          <option>tags</option>
          <option id="0" value="과제">
            과제
          </option>
          <option id="1" value="약속">
            약속
          </option>
          <option id="2" value="코딩">
            코딩
          </option>
        </select>
        <input
          onChange={writeTodoText}
          value={inputValue}
          required
          type="text"
          placeholder="할 일을 입력해 주세요."
        />
        <button>추가</button>
      </form>
      <ul>
        {selectedTags.map((tag) => (
          <span>#{tag.value} </span>
        ))}
      </ul>
      <ul>
        {todoDB.map((todoData) => (
          <li key={todoData.id} id={todoData.id}>
            <button onClick={completeCheck}>
              {!todoData.isCompleted ? `🤔` : `😍`}
            </button>
            {todoData.content}
            <button onClick={deleteTodo}>X</button>
            <div>
              {todoData.tags.map((tag) => (
                <span>{tag.value}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
