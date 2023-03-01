import { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import TaskStatusTabs from "./components/TaskStatusTabs.js";
import TodoInput from "./components/TodoInput.js";
import SelectedTagsList from "./components/SelectedTagsList";
import TagInput from "./components/TagInput";
import SelectTagsPanel from "./components/SelectTagsPanel";
import CreateTagPanel from "./components/CreateTagPanel.js";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [todosForRender, setTodosForRender] = useState([]);
  const [inputValue, setInputValue] = useState();

  const [selectedTags, setSelectedTags] = useState([]);
  const [savedTagList, setSavedTagList] = useState([]);
  const [newTag, setNewTag] = useState([]);
  const [tagInputValue, setTagInputValue] = useState();
  const [isSavedTagListShown, setIsSavedTagListShown] = useState(false);

  const completedTodos = todosForRender.filter(
    (todo) => todo.isCompleted == true
  );

  const incompleteTodos = todosForRender.filter(
    (todo) => todo.isCompleted == false
  );

  const [showOption, setShowOption] = useState("all");

  const [selectedTagForSearch, setSelectedTagForSearch] = useState(null);

  const [loading, setLoading] = useState(false);

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

  const [isCreateTodoShown, setIsCreateTodoShown] = useState(false);

  const [showMoreCreateOptions, setShowMoreCreateOptions] = useState(false);

  const onCloseTaskCreate = () => {
    setShowMoreCreateOptions(false);
    setIsCreateTodoShown(false);
    setIsSavedTagListShown(false);
    setSelectedTags([]);
  };

  const onShowCreateMore = () => {
    setShowMoreCreateOptions((current) => !current);
    setIsSavedTagListShown(false);
    setSelectedTags([]);
  };

  const onShowCreateTask = () => {
    setIsCreateTodoShown(true);
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
      if (showMoreCreateOptions) {
        setShowMoreCreateOptions(false);
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
      <button id="open-create-todo-btn" onClick={onShowCreateTask}>
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
        className={showMoreCreateOptions ? "full-page" : null}
        style={{ display: isCreateTodoShown ? "block" : "none" }}
      >
        <header>
          <button className="view-more-btn" onClick={onShowCreateMore}>
            {!showMoreCreateOptions ? "▼" : "▲"}
          </button>
          <h2>할 일 생성 ✏️</h2>
          <button onClick={onCloseTaskCreate} className="add-task-close-btn">
            X
          </button>
        </header>
        <div className="input-container">
          <TodoInput
            showMoreCreateOptions={showMoreCreateOptions}
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
          {/* <form className="tag-input-form" onSubmit={createOrSelectTag}>
            <SelectedTagsList
              selectedTags={selectedTags}
              delSelectedTag={delSelectedTag}
            />

            <TagInput
              savedTagList={savedTagList}
              handleShowSavedTagList={handleShowSavedTagList}
              tagInputValue={tagInputValue}
              setTagInputValue={setTagInputValue}
              setIsCreateTagBtnShown={setIsCreateTagBtnShown}
              setTagsFilteredList={setTagsFilteredList}
            />

            <div
              style={{ display: isSavedTagListShown ? "block" : "none" }}
              className="saved-tags-list"
            >
              <p>
                태그를 선택하거나 생성해주세요.{" "}
                <button onClick={handleSavedTagListShown}>X</button>
              </p>
              <ul>
                {tagInputValue ? paintRelatedSavedTags() : paintSavedTags()}
              </ul>
              <CreateTagPanel
                isCreateTagBtnShown={isCreateTagBtnShown}
                tagInputValue={tagInputValue}
              />
            </div>
          </form> */}
        </div>
        <button
          style={{ display: !showMoreCreateOptions ? "none" : "block" }}
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
