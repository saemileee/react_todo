import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import TaskStatusTabs from "./components/TaskStatusTabs.js";
import TodoInput from "./components/TodoInput.js";
import SelectTagsPanel from "./components/tag/SelectTagsPanel.js";
import CloseCreateTodo from "./components/CloseCreateTodoBtn.js";

function App() {
  //로딩
  const [loading, setLoading] = useState(false);

  const [allTodos, setAllTodos] = useState([]);
  const [todosForRender, setTodosForRender] = useState([]);
  const [inputValue, setInputValue] = useState();

  //태그 검색
  const [selectedTagForSearch, setSelectedTagForSearch] = useState(null);

  //태그
  const [tagInputValue, setTagInputValue] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [savedTagList, setSavedTagList] = useState([]);
  const [isSavedTagListShown, setIsSavedTagListShown] = useState(false);

  //탭 선택
  const [showOption, setShowOption] = useState("all");

  //투두 생성 오픈 여부
  const [isCreateTodoShown, setIsCreateTodoShown] = useState(false);
  const [isCreateOptionsShown, setIsCreateOptionsShown] = useState(false);

  //투두완료 리스트
  const completedTodos = todosForRender.filter(
    (todo) => todo.isCompleted == true
  );
  const incompleteTodos = todosForRender.filter(
    (todo) => todo.isCompleted == false
  );

  useEffect(() => {
    getTodoDB();
    setLoading(true);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("tagList", JSON.stringify(savedTagList));
  }, [savedTagList]);

  useEffect(() => {
    window.localStorage.setItem(
      "todosForRender",
      JSON.stringify(todosForRender)
    );
    window.localStorage.setItem("allTodos", JSON.stringify(allTodos));
  }, [todosForRender, allTodos]);

  const getTodoDB = () => {
    setTodosForRender(JSON.parse(localStorage.getItem("allTodos")));
    setAllTodos(JSON.parse(localStorage.getItem("allTodos")));
    setSavedTagList(JSON.parse(localStorage.getItem("tagList")));
  };

  const handleTagClick = (e) => {
    setTodosForRender(
      todosForRender.filter(
        (todo) => todo.tags.filter((tag) => tag.id == e.target.id).length > 0
      )
    );
    setSelectedTagForSearch(e.target.childNodes[0].data);
  };

  const handleCreateTodoShown = () => {
    setIsCreateTodoShown((current) => !current);
    if (!isCreateTodoShown) {
      setIsCreateOptionsShown(false);
      setIsSavedTagListShown(false);
      setSelectedTags([]);
    }
  };

  // const handleCreateTodoShown = () => {
  //   setIsCreateOptionsShown(false);
  //   setIsCreateTodoShown((current)=>(!current));
  //   setIsSavedTagListShown(false);
  //   setSelectedTags([]);
  // };

  const handleCreateOptionShown = () => {
    setIsCreateOptionsShown((current) => !current);
    setIsSavedTagListShown(false);
    setSelectedTags([]);
  };

  const allList = () => {
    setSelectedTagForSearch(null);
    setTodosForRender([...allTodos]);
  };

  const paintTodo = (todo) => {
    return (
      <li
        className={todo.isCompleted ? "completed" : null}
        key={todo.id}
        id={todo.id}
      >
        <button className="complete-btn" onClick={handleCompletion}>
          {!todo.isCompleted ? `🤔 미완료` : `😍 완료`}
        </button>
        <button className="del-task-btn" onClick={handleDelete}>
          X
        </button>
        <p className="todo-content">{todo.content}</p>
        <div className="todo-tags">
          {todo.tags.map((tag) => (
            <button id={tag.id} onClick={handleTagClick} className="tag">
              {tag.value}{" "}
            </button>
          ))}
        </div>
      </li>
    );
  };

  const handleSelectShowAll = () => {
    setShowOption("all");
  };

  const handleSelectShowCompleted = () => {
    setShowOption("completed");
  };

  const handleSelectShowUncompleted = () => {
    setShowOption("incompleted");
  };

  const handleSavedTagListShown = () => {
    setIsSavedTagListShown(false);
  };

  const handleShowSavedTagList = () => {
    setIsSavedTagListShown(true);
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

  const handleCompletion = (e) => {
    setTodosForRender(
      todosForRender.map((todoData) => {
        if (todoData.id == e.target.parentElement.id) {
          return { ...todoData, isCompleted: !todoData.isCompleted };
        }
        return todoData;
      })
    );

    setAllTodos(
      allTodos.map((todoData) => {
        if (todoData.id == e.target.parentElement.id) {
          return { ...todoData, isCompleted: !todoData.isCompleted };
        }
        return todoData;
      })
    );
  };

  const handleDelete = (e) => {
    setTodosForRender(
      todosForRender.filter((data) => e.target.parentElement.id != data.id)
    );
    setAllTodos(
      allTodos.filter((data) => e.target.parentElement.id != data.id)
    );
  };

  return (
    <div className="wrap">
      <h1>
        Manage
        <br /> your tasks✏️
      </h1>
      <button id="open-create-todo-btn" onClick={handleCreateTodoShown}>
        ✏️
      </button>
      <div>
        <div
          className="tag-search-result"
          style={{ display: selectedTagForSearch == null ? "none" : "block" }}
        >
          <span>필터: </span>
          <span className="tag">
            {selectedTagForSearch}
            <button onClick={allList}>X</button>
          </span>
        </div>
        <TaskStatusTabs
          setTagInputValue={setTagInputValue}
          showOption={showOption}
          handleSelectShowAll={handleSelectShowAll}
          handleSelectShowCompleted={handleSelectShowCompleted}
          handleSelectShowUncompleted={handleSelectShowUncompleted}
          todosForRender={todosForRender}
          completedTodos={completedTodos}
          incompleteTodos={incompleteTodos}
        />

        <ul id="task-list">
          {showOption == "all"
            ? todosForRender.map((todo) => paintTodo(todo))
            : showOption == "completed"
            ? completedTodos.map((todo) => paintTodo(todo))
            : incompleteTodos.map((todo) => paintTodo(todo))}
        </ul>
      </div>
      <div
        id="add-task"
        className={isCreateOptionsShown ? "full-page" : null}
        style={{ display: isCreateTodoShown ? "block" : "none" }}
      >
        <header>
          <button className="view-more-btn" onClick={handleCreateOptionShown}>
            {!isCreateOptionsShown ? "▼" : "▲"}
          </button>
          <h2>할 일 생성 ✏️</h2>
          <CloseCreateTodo />
          {/* <button
            onClick={handleCreateTodoShown}
            className="create-todo-close-btn"
          >
            X
          </button> */}
        </header>
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
            handleSavedTagListShown={handleSavedTagListShown}
            isSavedTagListShown={isSavedTagListShown}
            handleShowSavedTagList={handleShowSavedTagList}
          />
        </div>
        <button
          style={{ display: !isCreateOptionsShown ? "none" : "block" }}
          onClick={addNewTodoHandler}
          className="add-task-btn"
        >
          추가
        </button>
      </div>
    </div>
  );
}

export default App;
