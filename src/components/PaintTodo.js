import React from "react";

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

  function PaintTodo({ todos }) {
    return (
      <ul id="task-list">
        {todos.map((todo) => (
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
