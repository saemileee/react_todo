import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import TabPanel from "./components/TabPanel.js";

import PaintTodoList from "./components/PaintTodo.js";
import CreateTodo from "./components/CreateTodo.js";
import Filter from "./components/Filter.js";

function App() {
  //로딩
  const [loading, setLoading] = useState(false);

  //태그 검색
  const [selectedTagForSearch, setSelectedTagForSearch] = useState(null);

  //태그
  const [selectedTags, setSelectedTags] = useState([]);
  const [savedTagList, setSavedTagList] = useState([]);

  //탭 선택
  const [tabMode, setTabMode] = useState("all");

  //투두 생성 오픈 여부
  const [isCreateOptionsShown, setIsCreateOptionsShown] = useState(false);

  //전체 투두 리스트
  const [allTodos, setAllTodos] = useState([]);

  //태그 필터링 된 투두리스트
  const [todosForRender, setTodosForRender] = useState([]);

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

  const allList = () => {
    setSelectedTagForSearch(null);
    setTodosForRender([...allTodos]);
  };

  return (
    <div className="wrap">
      <h1>
        Manage
        <br /> your tasks✏️
      </h1>
      <div>
        <Filter allList={allList} selectedTagForSearch={selectedTagForSearch} />
        <TabPanel
          setTabMode={setTabMode}
          todosForRender={todosForRender}
          completedTodos={completedTodos}
          incompleteTodos={incompleteTodos}
          tabMode={tabMode}
        />

        <PaintTodoList
          tabMode={tabMode}
          todosForRender={todosForRender}
          setTodosForRender={setTodosForRender}
          allTodos={allTodos}
          setAllTodos={setAllTodos}
          setSelectedTagForSearch={setSelectedTagForSearch}
          completedTodos={completedTodos}
          incompleteTodos={incompleteTodos}
        />
      </div>
      <CreateTodo
        allTodos={allTodos}
        setAllTodos={setAllTodos}
        selectedTags={selectedTags}
        todosForRender={todosForRender}
        setTodosForRender={setTodosForRender}
        setSelectedTags={setSelectedTags}
        isCreateOptionsShown={isCreateOptionsShown}
        setIsCreateOptionsShown={setIsCreateOptionsShown}
        savedTagList={savedTagList}
        setSavedTagList={setSavedTagList}
      />
    </div>
  );
}

export default App;
