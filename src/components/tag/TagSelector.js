import CreateTagPanel from "./CreateTagPanel.js";
import CloseBtn from "../CloseBtn.js";
import PaintTagList from "./PaintTagList.js";

function TagSelector({
  isSavedTagListShown,
  handleSavedTagListShown,
  tagInputValue,
  tagsFilteredList,
  savedTagList,
  setSavedTagList,
  selectedTags,
  setSelectedTags,
  isCreateTagBtnShown,
  allTodos,
  setAllTodos,
  todosForRender,
  setTodosForRender,
}) {
  return (
    <div
      style={{ display: isSavedTagListShown ? "block" : "none" }}
      className="saved-tags-list"
    >
      <p>
        태그를 선택하거나 생성해주세요.{" "}
        <CloseBtn handleComponentClose={handleSavedTagListShown} />
      </p>
      <PaintTagList
        tagInputValue={tagInputValue}
        tagList={{ tagInputValue }.length > 0 ? tagsFilteredList : savedTagList}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        savedTagList={savedTagList}
        setSavedTagList={setSavedTagList}
        allTodos={allTodos}
        setAllTodos={setAllTodos}
        todosForRender={todosForRender}
        setTodosForRender={setTodosForRender}
      />
      <CreateTagPanel
        isCreateTagBtnShown={isCreateTagBtnShown}
        tagInputValue={tagInputValue}
      />
    </div>
  );
}

export default TagSelector;
