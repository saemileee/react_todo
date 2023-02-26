import { useState } from "react";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";

import "./reset.css";
import "./App.css";

function App() {
  const [todoDB, setTodoDB] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [savedTagList, setSavedTagList] = useState([]);
  const [newTag, setNewTag] = useState([]);
  const [tagInputValue, setTagInputValue] = useState();
  const [tagListStatus, setTagListStatus] = useState(false);
  const [tagCreateBtn, setTagCreateBtn] = useState(false);
  const [tagsFilteredList, setTagsFilteredList] = useState(savedTagList);

  const completedTodoDB = todoDB.filter((todo) => todo.isCompleted == true);

  const uncompletedTodoDB = todoDB.filter((todo) => todo.isCompleted == false);

  const [showOption, setShowOption] = useState("all");

  const paintTodo = (todo) => {
    return (
      <li key={todo.id} id={todo.id}>
        <button className="complete-btn" onClick={completeCheck}>
          {!todo.isCompleted ? `🤔` : `😍`}
        </button>
        <span className="todo-content">{todo.content}</span>
        <Button variant="outline-danger" size="sm" onClick={deleteTodo}>
          X
        </Button>
        <div className="todo-tags">
          {todo.tags.map((tag) => (
            <button className="tag">{tag.value} </button>
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

  const showTagList = () => {
    setTagListStatus((current) => !current);
  };

  const writeTagText = (e) => {
    setTagInputValue(e.target.value);
    if (savedTagList.filter((tag) => tag.value == e.target.value).length == 0) {
      setTagCreateBtn(true);
    } else {
      setTagCreateBtn(false);
    }

    setTagsFilteredList(
      [...savedTagList].filter((tag) => tag.value.includes(e.target.value))
    );
  };

  //새 태그를 크리에이트하는 경우 = 1번의 경우
  const createNewTag = (e) => {
    e.preventDefault();
    setNewTag({ id: new Date().getTime(), value: tagInputValue });
    const selectedTagFiltered = [...selectedTags].filter(
      (tag) => tag.value == tagInputValue
    );
    const savedTagListFiltered = [...savedTagList].filter(
      (tag) => tag.value == tagInputValue
    );

    if (selectedTagFiltered.length == 0 && savedTagListFiltered.length == 0) {
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

    // 저장된 value 값이 이미 저장된 taglist의 value 값하고 같은 경우 찾았따!
    //1. 작성한 태그가 selectedTag, savedTagList에 없는 경우
    //2. 작성한 태그가 selectedTag에는 없고 savedTagList에 있는 경우
    //3. 작성한 태그가 selectedTag에는 있고 savedTagList에 없는 경우
    //4. 작성한 태그가 selectedTag, savedTagList 둘다 있는 경우
  };

  const selectTag = (e) => {
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
    setTagInputValue("");
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
    <div className="wrap">
      <h1>ToDo List</h1>
      <form className="todo-form" onSubmit={addNewTodo}>
        <input
          onChange={writeTodoText}
          value={inputValue}
          required
          type="text"
          placeholder="할 일을 입력해 주세요."
        />
        <button>추가</button>
      </form>

      <div className="tag-select-container">
        <form className="tag-input-form" onSubmit={createNewTag}>
          <input
            onInput={writeTagText}
            onFocus={showTagList}
            onBlur={showTagList}
            value={tagInputValue}
            type="text"
            placeholder="태그를 추가해주세요."
          />
          <ul className="selected-tags-container">
            {selectedTags.map((tag) => (
              <button className="tag" id={tag.id}>
                {tag.value}
                <button onClick={delSelectedTag}>X</button>
              </button>
            ))}
          </ul>
          <div className="saved-tags-list">
            {/* <div style={{ display: tagListStatus ? "block" : "none" }}> */}
            <p>태그를 선택하거나 생성해주세요.</p>
            {tagsFilteredList.map((tag) => (
              <li id={tag.id} onClick={selectTag}>
                <span onClick={selectTag} className="tag">
                  {tag.value}
                </span>
              </li>
            ))}
            <div
              className="create-new-tag"
              style={{ display: tagCreateBtn ? "block" : "none" }}
            >
              <button>create</button>
              <span>{tagInputValue}</span>
            </div>
          </div>
        </form>
      </div>

      <hr />
      <ListGroup>
        <p>투두리스트</p>
        <ul className="tab">
          <li onClick={selectShowAllOption}>ALL ({todoDB.length})</li>
          <li onClick={selectShowCompletedOption}>
            Completed ({completedTodoDB.length})
          </li>
          <li onClick={selectShowUncompletedOption}>
            Uncompleted ({uncompletedTodoDB.length})
          </li>
        </ul>
        {showOption == "all"
          ? todoDB.map((todo) => paintTodo(todo))
          : showOption == "completed"
          ? completedTodoDB.map((todo) => paintTodo(todo))
          : uncompletedTodoDB.map((todo) => paintTodo(todo))}
      </ListGroup>
    </div>
  );
}

export default App;
