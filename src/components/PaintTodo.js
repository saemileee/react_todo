import React, { useEffect, useState } from "react";

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

    return (
      <ul id="task-list">
        {_todos.map((todo, index) => (
          <li
            className={todo.isCompleted ? "completed" : null}
            key={index}
            id={todo.id}
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            {" "}
            <span className="ordering-btn">a</span>
            <button className="complete-btn" onClick={handleCompletion}>
              {!todo.isCompleted ? `🤔 미완료` : `😍 완료`}
            </button>
            <button className="del-task-btn" onClick={handleDelete}>
              X
            </button>
            <p className="todo-content">{todo.content}</p>
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
