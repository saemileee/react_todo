function TodoAddBtn({ isCreateOptionsShown, addNewTodoHandler, value }) {
  return (
    <button
      style={{ display: !isCreateOptionsShown ? "none" : "block" }}
      onClick={addNewTodoHandler}
      className="add-todo-btn"
    >
      {value}
    </button>
  );
}

export default TodoAddBtn;
