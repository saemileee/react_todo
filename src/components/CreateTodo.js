import { useEffect, useState } from "react";
import TodoInput from "./TodoInput.js";
import SelectTagsPanel from "./tag/SelectTagsPanel.js";
import TodoCreateHeader from "./TodoCreateHeader.js";
import TodoAddBtn from "./TodoAddBtn.js";

function CreateTodo({
  allTodos,
  setAllTodos,
  selectedTags,
  todosForRender,
  setTodosForRender,
  setSelectedTags,
  isCreateOptionsShown,
  setIsCreateOptionsShown,
  savedTagList,
  setSavedTagList,
}) {
  useEffect(() => {
    window.localStorage.setItem("tagList", JSON.stringify(savedTagList));
  }, [savedTagList]);
  const [inputValue, setInputValue] = useState();
  const [tagInputValue, setTagInputValue] = useState();

  const [isCreateTodoShown, setIsCreateTodoShown] = useState(false);

  //   const [savedTagList, setSavedTagList] = useState([]);

  const [isSavedTagListShown, setIsSavedTagListShown] = useState(false);

  const handleCreateTodoShown = () => {
    setIsCreateTodoShown((current) => !current);
    if (!isCreateTodoShown) {
      setIsCreateOptionsShown(false);
      setIsSavedTagListShown(false);
      setSelectedTags([]);
    }
  };

  const addNewTodoHandler = (e) => {
    e.preventDefault();
    const newTodoId = new Date().getTime();
    if (inputValue != "") {
      setAllTodos([
        {
          id: newTodoId,
          content: inputValue,
          isCompleted: false,
          tags: selectedTags,
        },
        ...allTodos,
      ]);

      setTodosForRender([
        {
          id: newTodoId,
          content: inputValue,
          isCompleted: false,
          tags: selectedTags,
        },
        ...todosForRender,
      ]);
      setInputValue("");
      setTagInputValue("");
      setSelectedTags([]);
      if (isCreateOptionsShown) {
        setIsCreateOptionsShown(false);
      }
    }
  };

  const handleCreateOptionShown = () => {
    setIsCreateOptionsShown((current) => !current);
    setIsSavedTagListShown(false);
    setSelectedTags([]);
  };

  const handleSavedTagListShown = () => {
    setIsSavedTagListShown((current) => !current);
  };

  return (
    <div id="create-todo-wrap">
      <button id="open-create-todo-btn" onClick={handleCreateTodoShown}>
        ✏️
      </button>
      <div
        id="add-todo"
        className={isCreateOptionsShown ? "full-page" : null}
        style={{ display: isCreateTodoShown ? "block" : "none" }}
      >
        <TodoCreateHeader
          handleCreateOptionShown={handleCreateOptionShown}
          isCreateOptionsShown={isCreateOptionsShown}
          handleCreateTodoShown={handleCreateTodoShown}
        />
        <div className="input-container">
          <TodoInput
            isCreateOptionsShown={isCreateOptionsShown}
            addNewTodoHandler={addNewTodoHandler}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
        <div id="tag-select-container">
          <h3>Tags</h3>
          <SelectTagsPanel
            savedTagList={savedTagList}
            setSavedTagList={setSavedTagList}
            tagInputValue={tagInputValue}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            isSavedTagListShown={isSavedTagListShown}
          />
        </div>
        <TodoAddBtn
          value="추가"
          isCreateOptionsShown={isCreateOptionsShown}
          addNewTodoHandler={addNewTodoHandler}
        />
      </div>
    </div>
  );
}

export default CreateTodo;
