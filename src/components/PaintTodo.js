import React from "react";

function TodoItem({ todo, completeCheck, deleteTodo, onClickTag }) {
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
}

export default TodoItem;