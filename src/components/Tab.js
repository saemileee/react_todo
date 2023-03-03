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

export default Tab;
