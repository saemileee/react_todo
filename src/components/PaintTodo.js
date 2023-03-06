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
}) {
  const editRef = useRef();

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

  function PaintTodo({ todos }) {
    const [editInputValue, setEditInputValue] = useState();

    const handleEditMode = (e) => {
      const editingID = _todos.map((todo) =>
        todo.id == e.target.parentElement.parentElement.id
          ? { ...todo, isEditing: true }
          : todo
      );
      _setTodos(editingID);
    };

    const handleEditModeDone = (e) => {
      const editingID = _todos.map((todo) =>
        todo.id == e.target.parentElement.id
          ? {
              id: todo.id,
              content: editInputValue,
              isCompleted: todo.isCompleted,
              tags: todo.tags,
              isEditing: false,
            }
          : todo
      );
      setTodosForRender(editingID);
    };

    const updateInputValue = (e) => {
      setEditInputValue(e.target.value);
    };

    const [_todos, _setTodos] = useState([...todos]);

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
    };

    // const draggable = React.useRef("false");
    const draggable = React.useRef("false");
    const dropPointer = React.useRef("none");

    return (
      <ul id="task-list">
        {_todos.map((todo, index) => (
          <div key={index} className={todo.isEditing ? "edit-mode" : null}>
            <li
              className={todo.isCompleted ? "completed" : null}
              key={index}
              id={todo.id}
              draggable
              // draggable={draggable.current}
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <span className="ordering-btn">a</span>
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
                수정완료
              </button>
              <p className="todo-content">
                <input
                  type="text"
                  value={editInputValue}
                  onInput={updateInputValue}
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
    />
  );
}

export default PaintTodoList;
