function CloseCreateTodoBtn({ handleCreateTodoShown }) {
  handleCreateTodoShown();
  return (
    <button onClick={handleCreateTodoShown} className="create-todo-close-btn">
      X
    </button>
  );
}

export default CloseCreateTodoBtn;
