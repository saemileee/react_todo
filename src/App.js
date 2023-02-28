import { useEffect, useState } from "react";
// import {
//   Button,
//   ListGroup,
//   ListGroupItem,
//   Form,
//   InputGroup,
//   Badge,
// } from "react-bootstrap";

import "./reset.css";
import "./App.css";

function App() {
  const [ogTodoDB, setOGTodoDB] = useState([]);
  const [todoDB, setTodoDB] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [savedTagList, setSavedTagList] = useState([]);
  const [newTag, setNewTag] = useState([]);
  const [tagInputValue, setTagInputValue] = useState();
  const [showTagList, setShowTagList] = useState(false);
  const [tagCreateBtn, setTagCreateBtn] = useState(false);
  const [tagsFilteredList, setTagsFilteredList] = useState(savedTagList);

  const completedTodoDB = todoDB.filter((todo) => todo.isCompleted == true);

  const uncompletedTodoDB = todoDB.filter((todo) => todo.isCompleted == false);

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
    window.localStorage.setItem("todoDB", JSON.stringify(todoDB));
    window.localStorage.setItem("ogTodoDB", JSON.stringify(ogTodoDB));
  }, [todoDB, ogTodoDB]);

  const paintSavedTags = () => {
    return savedTagList.map((tag) => (
      <li id={tag.id} onClick={selectTag}>
        <span className="tag">{tag.value}</span>
      </li>
    ));
  };

  const paintRelatedSavedTags = () => {
    return tagsFilteredList.map((tag) => (
      <li id={tag.id} onClick={selectTag}>
        <span className="tag">{tag.value}</span>
      </li>
    ));
  };

  const paintSelectedTags = (tag) => {
    return (
      <button className="tag" id={tag.id}>
        {tag.value}
        <button onClick={delSelectedTag}>X</button>
      </button>
    );
  };

  const getTodoDB = () => {
    setTodoDB(JSON.parse(localStorage.getItem("ogTodoDB")));
    setOGTodoDB(JSON.parse(localStorage.getItem("ogTodoDB")));
    setSavedTagList(JSON.parse(localStorage.getItem("tagList")));
  };

  const onClickTag = (e) => {
    setTodoDB(
      todoDB.filter(
        (todo) => todo.tags.filter((tag) => tag.id == e.target.id).length > 0
      )
    );
    setSelectedTagForSearch(e.target.childNodes[0].data);
  };

  const [showCreateTask, setShowCreateTask] = useState(false);

  const [showCreateMore, setShowCreateMore] = useState(false);

  const onCloseTaskCreate = () => {
    setShowCreateMore(false);
    setShowCreateTask(false);
    setShowTagList(false);
    setSelectedTags([]);
  };

  const onShowCreateMore = () => {
    setShowCreateMore((current) => !current);
    setShowTagList(false);
    setSelectedTags([]);
  };

  const onShowCreateTask = () => {
    setShowCreateTask(true);
  };

  const allList = () => {
    setSelectedTagForSearch(null);
    setTodoDB([...ogTodoDB]);
  };

  const paintTodo = (todo) => {
    return (
      <li
        className={todo.isCompleted ? "completed" : null}
        key={todo.id}
        id={todo.id}
      >
        <button className="complete-btn" onClick={completeCheck}>
          {!todo.isCompleted ? `🤔 미완료` : `😍 완료`}
        </button>
        <button className="del-task-btn" onClick={deleteTodo}>
          X
        </button>
        <p className="todo-content">{todo.content}</p>
        <div className="todo-tags">
          {todo.tags.map((tag) => (
            <button id={tag.id} onClick={onClickTag} className="tag">
              {tag.value}{" "}
            </button>
          ))}
        </div>
      </li>
    );
  };

  const selectShowAllOption = () => {
    setShowOption("all");
  };

  const selectShowCompletedOption = () => {
    setShowOption("completed");
  };

  const selectShowUncompletedOption = () => {
    setShowOption("uncompleted");
  };

  const onCloseTagList = () => {
    setShowTagList(false);
  };

  const onShowTagList = () => {
    setShowTagList(true);
  };

  const writeTagText = (e) => {
    setTagInputValue(e.target.value);
    const text = e.target.value.replaceAll(" ", "");
    if (
      text !== "" &&
      savedTagList.filter((tag) => tag.value == e.target.value).length == 0
    ) {
      setTagCreateBtn(true);
    } else {
      setTagCreateBtn(false);
    }
    setTagsFilteredList(
      [...savedTagList].filter((tag) => tag.value.includes(e.target.value))
    );
    // console.log(e.target.value);
  };

  //새 태그를 크리에이트하는 경우 = 1번의 경우
  const createNewTag = (e) => {
    e.preventDefault();
    const text = tagInputValue.replaceAll(" ", "");

    // setNewTag({ id: new Date().getTime(), value: tagInputValue });
    const selectedTagFiltered = [...selectedTags].filter(
      (tag) => tag.value == tagInputValue
    );
    const savedTagListFiltered = [...savedTagList].filter(
      (tag) => tag.value == tagInputValue
    );

    if (
      text != "" &&
      selectedTagFiltered.length == 0 &&
      savedTagListFiltered.length == 0
    ) {
      setSelectedTags([
        ...selectedTags,
        { id: new Date().getTime(), value: tagInputValue },
      ]);
      setSavedTagList([
        ...savedTagList,
        { id: new Date().getTime(), value: tagInputValue },
      ]);
    }

    setTagInputValue("");
    setTagCreateBtn(false);
    paintSavedTags();
    // window.localStorage.setItem("tagList", JSON.stringify(savedTagList));

    // 저장된 value 값이 이미 저장된 taglist의 value 값하고 같은 경우 찾았따!
    //1. 작성한 태그가 selectedTag, savedTagList에 없는 경우
    //2. 작성한 태그가 selectedTag에는 없고 savedTagList에 있는 경우
    //3. 작성한 태그가 selectedTag에는 있고 savedTagList에 없는 경우
    //4. 작성한 태그가 selectedTag, savedTagList 둘다 있는 경우
  };

  const selectTag = (e) => {
    // e.preventDefault();
    console.log(e.target.id);
    if ([...selectedTags].filter((tag) => tag.id == e.target.id).length == 0) {
      setSelectedTags([
        ...selectedTags,
        ...savedTagList.filter((tag) => tag.id == e.target.id),
      ]);
    }
    //저장된 태그리스트에서 태그를 눌렀을 때 아이디가 같은 것을 셀렉티드로 추가
    // + 중복되는 리스트는 추가 안되게 수정해야함
  };

  const delSelectedTag = (e) => {
    setSelectedTags(
      selectedTags.filter((tag) => e.target.parentElement.id != tag.id)
    );
  };

  const writeTodoText = (e) => {
    setInputValue(e.target.value);
  };
  const addNewTodo = (e) => {
    e.preventDefault();
    const newID = new Date().getTime();
    if (inputValue != "") {
      setOGTodoDB([
        {
          id: newID,
          content: inputValue,
          isCompleted: false,
          tags: selectedTags,
        },
        ...ogTodoDB,
      ]);

      setTodoDB([
        {
          id: newID,
          content: inputValue,
          isCompleted: false,
          tags: selectedTags,
        },
        ...todoDB,
      ]);
      setInputValue("");
      setTagInputValue("");
      setSelectedTags([]);
      if (showCreateMore) {
        setShowCreateMore(false);
      }
    }
  };

  const keepTask = (e) => {
    e.preventDefault();
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

    setOGTodoDB(
      ogTodoDB.map((todoData) => {
        if (todoData.id == e.target.parentElement.id) {
          return { ...todoData, isCompleted: !todoData.isCompleted };
        }
        return todoData;
      })
    );
  };

  const deleteTodo = (e) => {
    setTodoDB(todoDB.filter((data) => e.target.parentElement.id != data.id));
    setOGTodoDB(
      ogTodoDB.filter((data) => e.target.parentElement.id != data.id)
    );
  };

  return (
    <div className="wrap">
      <h1>
        Manage
        <br /> your tasks✏️
      </h1>
      <button id="add-task-btn" onClick={onShowCreateTask}>
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
        {/* 선택한 태그 명이 나오기 */}
        <ul className="tab">
          <li
            className={showOption == "all" ? "selected" : null}
            onClick={selectShowAllOption}
          >
            전체 <span>{todoDB.length}</span>
          </li>
          <li
            className={showOption == "completed" ? "selected" : null}
            onClick={selectShowCompletedOption}
          >
            완료 <span>{completedTodoDB.length}</span>
          </li>
          <li
            className={showOption == "uncompleted" ? "selected" : null}
            onClick={selectShowUncompletedOption}
          >
            미완료 <span>{uncompletedTodoDB.length}</span>
          </li>
        </ul>
        <ul id="task-list">
          {showOption == "all"
            ? todoDB.map((todo) => paintTodo(todo))
            : showOption == "completed"
            ? completedTodoDB.map((todo) => paintTodo(todo))
            : uncompletedTodoDB.map((todo) => paintTodo(todo))}
        </ul>
      </div>
      <div
        id="add-task"
        className={showCreateMore ? "full-page" : null}
        style={{ display: showCreateTask ? "block" : "none" }}
      >
        <header>
          <button className="view-more-btn" onClick={onShowCreateMore}>
            {!showCreateMore ? "▼" : "▲"}
          </button>
          <h2>할 일 생성 ✏️</h2>
          <button onClick={onCloseTaskCreate} className="add-task-close-btn">
            X
          </button>
        </header>
        <div className="input-container">
          <form
            className="todo-form"
            onSubmit={showCreateMore ? keepTask : addNewTodo}
          >
            <h3>Task</h3>
            <input
              onChange={writeTodoText}
              value={inputValue}
              required
              type="text"
              placeholder="할 일을 입력해 주세요."
            />
            {/* <button>추가</button> */}
          </form>
        </div>
        <div id="tag-select-container">
          <h3>Tags</h3>
          <form className="tag-input-form" onSubmit={createNewTag}>
            <ul className="selected-tags-container">
              {selectedTags.map((tag) => paintSelectedTags(tag))}
            </ul>
            <input
              onInput={writeTagText}
              onFocus={onShowTagList}
              // onBlur={showTagList}
              value={tagInputValue}
              type="text"
              placeholder="태그를 추가해주세요."
            />

            <div
              style={{ display: showTagList ? "block" : "none" }}
              className="saved-tags-list"
            >
              <p>
                태그를 선택하거나 생성해주세요.{" "}
                <button onClick={onCloseTagList}>X</button>
              </p>
              <ul>
                {tagInputValue ? paintRelatedSavedTags() : paintSavedTags()}
                <div
                  className="create-new-tag"
                  style={{ display: tagCreateBtn ? "block" : "none" }}
                >
                  <button>create</button>
                  <span className="tag">{tagInputValue}</span>
                </div>
              </ul>
            </div>
          </form>
        </div>
        <button
          style={{ display: !showCreateMore ? "none" : "block" }}
          onClick={addNewTodo}
          className="add-task-btn"
        >
          추가
        </button>
      </div>
    </div>
  );
}

export default App;
