import ViewMore from "./ViewMoreBtn";
import CloseBtn from "./CloseBtn.js";

function TodoCreateHeader({
  handleCreateOptionShown,
  isCreateOptionsShown,
  handleCreateTodoShown,
}) {
  return (
    <header>
      <ViewMore
        handleComponentToggle={handleCreateOptionShown}
        isOpen={isCreateOptionsShown}
      />
      <h2>할 일 생성 ✏️</h2>
      <CloseBtn handleComponentClose={handleCreateTodoShown} />
    </header>
  );
}

export default TodoCreateHeader;
