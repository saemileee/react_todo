import { useEffect, useState } from "react";

function TabPanel({
  showOption,
  selectShowAllOption,
  todoDB,
  selectShowCompletedOption,
  completedTodoDB,
  selectShowUncompletedOption,
  uncompletedTodoDB,
}) {
  return (
    <ul className="tab">
      <li
        className={showOption == "all" ? "selected" : null}
        onClick={selectShowAllOption}
      >
        전체 <span>{todoDB.length}</span>
      </li>
      <li
        className={showOption == "completed" ? "selected" : null}
        onClick={selectShowCompletedOption}
      >
        완료 <span>{completedTodoDB.length}</span>
      </li>
      <li
        className={showOption == "uncompleted" ? "selected" : null}
        onClick={selectShowUncompletedOption}
      >
        미완료 <span>{uncompletedTodoDB.length}</span>
      </li>
    </ul>
  );
}

export default TabPanel;
