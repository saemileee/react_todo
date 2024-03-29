import { useState } from "react";
import SelectedTagsList from "./SelectedTagsList.js";
import TagInput from "./TagInput.js";
import TagSelector from "./TagSelector.js";
function RenderSelectTagsPanel({
  selectedTags,
  setSelectedTags,
  isSavedTagListShown,
  handleSavedTagListShown,
  savedTagList,
  setSavedTagList,
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
      <TagInput
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
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        isCreateTagBtnShown={isCreateTagBtnShown}
      />
    </div>
  );
}

export default RenderSelectTagsPanel;
