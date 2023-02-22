import { useState } from "react";

function App() {
  const [todoDB, setTodoDB] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [savedTagList, setSavedTagList] = useState([]);
  const [newTag, setNewTag] = useState([]);
  const [tagInputValue, setTagInputValue] = useState();
  const [tagListStatus, setTagListStatus] = useState(false);

  const showTagList = () => {
    setTagListStatus((current) => !current);
  };

  const writeTagText = (e) => {
    setTagInputValue(e.target.value);
  };

  const addNewTag = (e) => {
    e.preventDefault();
    setNewTag({ id: new Date().getTime(), value: tagInputValue });
    const selectedTagFiltered = [...selectedTags].filter(
      (tag) => tag.value == tagInputValue
    );

    if (selectedTagFiltered.length == 0) {
      setSelectedTags([
        ...selectedTags,
        { id: new Date().getTime(), value: tagInputValue },
      ]);
    }
    setTagInputValue("");

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

  const updateTagList = () => {
    // let newTags = [];
    // for (let i = 0; i < savedTagList.length; i++) {
    //   for (let j = 0; j < selectedTags.length; i++) {
    //     if (savedTagList[i] !== selectedTags[j]) {
    //       newTags.push(selectedTags[j]);
    //     }
    //   }
    // }
    setSavedTagList([...savedTagList, ...selectedTags]);
    //투두리스트를 추가할 때 세이브드 태그 리스트에 없던 셀렉티드 태그 리스트를 세이브드에 추가하는 것
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
    setSelectedTags([]);
    updateTagList();
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
        <input
          onChange={writeTodoText}
          value={inputValue}
          required
          type="text"
          placeholder="할 일을 입력해 주세요."
        />
        <button>추가</button>
      </form>
      <form onSubmit={addNewTag}>
        <input
          onChange={writeTagText}
          onFocus={showTagList}
          onBlur={showTagList}
          value={tagInputValue}
          type="text"
          placeholder="엔터로 태그 추가"
        ></input>
      </form>
      <div style={{ display: tagListStatus ? "block" : "none" }}>
        <p>태그 옵션 목록 (토글 필요)</p>
        {savedTagList.map((tag) => (
          <li id={tag.id} onClick={selectTag}>
            {tag.value}
          </li>
        ))}
      </div>
      <ul>
        <span>선택한 태그: </span>
        {selectedTags.map((tag) => (
          <span id={tag.id}>
            #{tag.value}
            <button onClick={delSelectedTag}>X</button>
          </span>
        ))}
      </ul>
      <hr />
      <ul>
        <p>투두리스트</p>
        {todoDB.map((todoData) => (
          <li key={todoData.id} id={todoData.id}>
            <button onClick={completeCheck}>
              {!todoData.isCompleted ? `🤔` : `😍`}
            </button>
            {todoData.content}
            <button onClick={deleteTodo}>X</button>
            <div>
              {todoData.tags.map((tag) => (
                <span>#{tag.value} </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
