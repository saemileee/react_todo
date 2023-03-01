function renderTodoTabs({
  showOption,
  handleSelectShowAll,
  handleSelectShowCompleted,
  handleSelectShowUncompleted,
  todosForRender,
  completedTodos,
  incompleteTodos,
}) {
  return (
    <ul className="tab">
      <li
        className={showOption == "all" ? "selected" : null}
        onClick={handleSelectShowAll}
      >
        전체 <span>{todosForRender.length}</span>
      </li>
      <li
        className={showOption == "completed" ? "selected" : null}
        onClick={handleSelectShowCompleted}
      >
        완료 <span>{completedTodos.length}</span>
      </li>
      <li
        className={showOption == "incompleted" ? "selected" : null}
        onClick={handleSelectShowUncompleted}
      >
        미완료 <span>{incompleteTodos.length}</span>
      </li>
    </ul>
  );
}

export default renderTodoTabs;
