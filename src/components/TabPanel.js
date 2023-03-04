function Tab({ tabMode, setTabMode, title, count, mode }) {
  const handleListTabOption = (e) => {
    setTabMode(e.target.id);
    if (tabMode == "all") {
    }
  };
  return (
    <li
      id={mode}
      className={tabMode == mode ? "selected" : ""}
      onClick={handleListTabOption}
    >
      {title} <span id={mode}>{count}</span>
    </li>
  );
}

function TabPanel({
  setTabMode,
  todosForRender,
  completedTodos,
  tabMode,
  incompleteTodos,
}) {
  return (
    <ul className="tab">
      <Tab
        tabMode={tabMode}
        setTabMode={setTabMode}
        title={"전체"}
        count={todosForRender.length}
        mode={"all"}
      />
      <Tab
        tabMode={tabMode}
        setTabMode={setTabMode}
        title={"완료"}
        count={completedTodos.length}
        mode={"completed"}
      />
      <Tab
        tabMode={tabMode}
        setTabMode={setTabMode}
        title={"미완료"}
        count={incompleteTodos.length}
        mode={"incompleted"}
      />
    </ul>
  );
}

export default TabPanel;
