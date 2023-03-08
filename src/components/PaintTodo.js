import React, { useEffect, useState, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";

function PaintTodoList({
  tabMode,
  todosForRender,
  setTodosForRender,
  allTodos,
  setAllTodos,
  setSelectedTagForSearch,
  completedTodos,
  incompleteTodos,
  selectedTagForSearch,
}) {
  //수정모드
  const [editInputValue, setEditInputValue] = useState();

  const handleEditMode = (e) => {
    const editModeArr = todosForRender.map((todo) =>
      todo.id == e.target.parentElement.parentElement.id
        ? { ...todo, isEditing: true }
        : { ...todo, isEditing: false }
    );
    const editingInput = todosForRender.filter(
      (todo) => todo.id == e.target.parentElement.parentElement.id
    );
    setTodosForRender(editModeArr);
    setEditInputValue(editingInput[0].content);
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
      todosForRender.filter(
        (data) => e.target.parentElement.parentElement.id != data.id
      )
    );
    setAllTodos(
      allTodos.filter(
        (data) => e.target.parentElement.parentElement.id != data.id
      )
    );
  };

  const handleTagClick = (e) => {
    setTodosForRender(
      todosForRender.filter(
        (todo) => todo.tags.filter((tag) => tag.id == e.target.id).length > 0
      )
    );
    setSelectedTagForSearch(e.target.childNodes[0].data);
  };
  //save reference for dragItem and dragOverItem
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  //페인트투두 함수
  function PaintTodo({
    todos,
    editInputValue,
    setTodosForRender,
    todosForRender,
    selectedTagForSearch,
  }) {
    const [_todos, _setTodos] = useState([...todos]);
    const [_editInputValue, _setEditInputValue] = useState(editInputValue);

    const handleEditModeDone = (e) => {
      let targetId = undefined;
      if (e.target.localName == "button") {
        targetId = e.target.parentElement.id;
      } else if (e.target.localName == "input") {
        targetId = e.target.parentElement.parentElement.id;
      }

      let editModeArr = todosForRender.map((todo) =>
        todo.id == targetId
          ? {
              id: todo.id,
              content: _editInputValue,
              isCompleted: todo.isCompleted,
              tags: todo.tags,
              isEditing: false,
            }
          : todo
      );

      let editModeArrForAll = allTodos.map((todo) =>
        todo.id == targetId
          ? {
              id: todo.id,
              content: _editInputValue,
              isCompleted: todo.isCompleted,
              tags: todo.tags,
              isEditing: false,
            }
          : todo
      );
      setTodosForRender(editModeArr);
      setAllTodos(editModeArrForAll);
    };

    //const handel drag sorting
    const handleSort = () => {
      //duplicate items
      let __todos = [..._todos];

      //remove and save the dragged item content
      const draggedItemContent = __todos.splice(dragItem.current, 1)[0];

      //switch the position
      __todos.splice(dragOverItem.current, 0, draggedItemContent);

      //reset the position ref
      dragItem.current = null;
      dragOverItem.current = null;

      //update the actual array
      _setTodos(__todos);
      setTodosForRender(__todos);
      setAllTodos(__todos);
    };

    const dropPointer = React.useRef("none");

    return (
      <ul id="task-list">
        {_todos.map((todo, index) => (
          <div key={index} className={todo.isEditing ? "edit-mode" : null}>
            <li
              className={todo.isCompleted ? "completed" : null}
              key={index}
              id={todo.id}
              draggable={
                tabMode === "all" && selectedTagForSearch == null ? true : false
              }
              // draggable={draggable.current}
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <span
                className="ordering-btn"
                style={{
                  display:
                    tabMode === "all" && selectedTagForSearch == null
                      ? "inline-block"
                      : "none",
                }}
              >
                🖱
              </span>
              <button className="complete-btn" onClick={handleCompletion}>
                {!todo.isCompleted ? `🤔 미완료` : `😍 완료`}
              </button>
              <div className="todo-set-btns">
                <button className="edit-mode-btn" onClick={handleEditMode}>
                  ✏️
                </button>
                <button className="del-task-btn" onClick={handleDelete}>
                  X
                </button>
              </div>

              <button className="edit-done-btn" onClick={handleEditModeDone}>
                수정
              </button>
              <p className="todo-content">
                <input
                  type="text"
                  value={_editInputValue}
                  onInput={(e) => _setEditInputValue(e.target.value)}
                  onKeyDown={(e) =>
                    e.code === "Enter" ? handleEditModeDone(e) : null
                  }
                ></input>
                <span>{todo.content}</span>
              </p>
              <div className="todo-tags">
                {todo.tags.map((tag) => (
                  <button
                    key={tag.id}
                    id={tag.id}
                    onClick={handleTagClick}
                    className="tag"
                  >
                    {tag.value}{" "}
                  </button>
                ))}
              </div>
            </li>
            <div
              className="drop_point"
              style={{ display: dropPointer.current }}
            ></div>
          </div>
        ))}
      </ul>
    );
  }

  return (
    <PaintTodo
      todos={
        tabMode == "all"
          ? todosForRender
          : tabMode == "completed"
          ? completedTodos
          : tabMode == "incompleted"
          ? incompleteTodos
          : null
      }
      editInputValue={editInputValue}
      setTodosForRender={setTodosForRender}
      todosForRender={todosForRender}
      selectedTagForSearch={selectedTagForSearch}
    />
  );
}

export default PaintTodoList;
