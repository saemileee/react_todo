import { useState } from "react";
import SelectedTagsList from "./SelectedTagsList.js";
import { RenderTagInput } from "./TagInput.js";
import TagSelector from "./TagSelector.js";

function RenderSelectTagsPanel({
  selectedTags,
  setSelectedTags,
  isSavedTagListShown,
  handleSavedTagListShown,
  savedTagList,
  setSavedTagList,
  allTodos,
  setAllTodos,
  todosForRender,
  setTodosForRender,
}) {
  const [tagInputValue, setTagInputValue] = useState();

  const [tagsFilteredList, setTagsFilteredList] = useState(savedTagList);

  const [isCreateTagBtnShown, setIsCreateTagBtnShown] = useState(false);
  return (
    <div>
      <SelectedTagsList
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <RenderTagInput
        handleSavedTagListShown={handleSavedTagListShown}
        savedTagList={savedTagList}
        tagInputValue={tagInputValue}
        setTagInputValue={setTagInputValue}
        setIsCreateTagBtnShown={setIsCreateTagBtnShown}
        setTagsFilteredList={setTagsFilteredList}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        setSavedTagList={setSavedTagList}
      />
      <TagSelector
        isSavedTagListShown={isSavedTagListShown}
        handleSavedTagListShown={handleSavedTagListShown}
        tagInputValue={tagInputValue}
        tagsFilteredList={tagsFilteredList}
        savedTagList={savedTagList}
        setSavedTagList={setSavedTagList}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        isCreateTagBtnShown={isCreateTagBtnShown}
        allTodos={allTodos}
        setAllTodos={setAllTodos}
        todosForRender={todosForRender}
        setTodosForRender={setTodosForRender}
      />
    </div>
  );
}

export default RenderSelectTagsPanel;
