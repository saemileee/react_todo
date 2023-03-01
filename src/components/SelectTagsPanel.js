import { useEffect, useState } from "react";

import SelectedTagsList from "./SelectedTagsList.js";
import TagInput from "./TagInput.js";
import CreateTagPanel from "./CreateTagPanel.js";

function RenderSelectTagsPanel({
  selectedTags,
  setSelectedTags,
  isSavedTagListShown,
  handleSavedTagListShown,
  savedTagList,
  setSavedTagList,
  handleShowSavedTagList,
}) {
  const [tagInputValue, setTagInputValue] = useState();

  const [tagsFilteredList, setTagsFilteredList] = useState(savedTagList);

  const [isCreateTagBtnShown, setIsCreateTagBtnShown] = useState(false);

  const paintSavedTags = () => {
    return savedTagList.map((tag) => (
      <li id={tag.id} onClick={selectTagOnList}>
        <span onClick={selectTagOnList} className="tag">
          {tag.value}
        </span>
      </li>
    ));
  };

  const paintRelatedSavedTags = () => {
    return tagsFilteredList.map((tag) => (
      <li id={tag.id} onClick={selectTagOnList}>
        <span className="tag">{tag.value}</span>
      </li>
    ));
  };

  const selectTagOnList = (e) => {
    let selectedTagId = "";
    if (e.target.localName == "span") {
      selectedTagId = e.target.parentElement.id;
    } else {
      selectedTagId = e.target.id;
    }

    const existingTag = [...selectedTags].filter(
      (tag) => tag.id == selectedTagId
    );

    if (existingTag.length == 0) {
      setSelectedTags([
        ...selectedTags,
        ...savedTagList.filter((tag) => tag.id == selectedTagId),
      ]);
    }
  };

  const createOrSelectTag = (e) => {
    e.preventDefault();
    const text = tagInputValue.replaceAll(" ", "");
    //InputText가 공백만 있는지 판단

    const existingSelectedTag = [...selectedTags].filter(
      (tag) => tag.value == tagInputValue
    );
    const existingSavedTag = [...savedTagList].filter(
      (tag) => tag.value == tagInputValue
    );

    if (
      text != "" &&
      existingSelectedTag.length == 0 &&
      existingSavedTag.length == 0
    ) {
      setSelectedTags([
        ...selectedTags,
        { id: new Date().getTime(), value: tagInputValue },
      ]);
      setSavedTagList([
        ...savedTagList,
        { id: new Date().getTime(), value: tagInputValue },
      ]);
    } else if (
      text != "" &&
      existingSelectedTag.length == 0 &&
      existingSavedTag.length != 0
    ) {
      setSelectedTags([...selectedTags, ...existingSavedTag]);
    }

    setTagInputValue("");
    setIsCreateTagBtnShown(false);
    paintSavedTags();

    // 저장된 value 값이 이미 저장된 taglist의 value 값하고 같은 경우 찾았따!
    //1. 작성한 태그가 selectedTag, savedTagList에 없는 경우 << 새롭게 태그를 생성하고 selectedTag 리스트에 추가함

    //2. 작성한 태그가 selectedTag에는 없고 savedTagList에 있는 경우 << 태그는 생성하지말고 selectedTag리스트에만 추가함
  };

  const delSelectedTag = (e) => {
    setSelectedTags(
      selectedTags.filter((tag) => e.target.parentElement.id != tag.id)
    );
  };

  return (
    <form className="tag-input-form" onSubmit={createOrSelectTag}>
      <SelectedTagsList
        selectedTags={selectedTags}
        delSelectedTag={delSelectedTag}
      />

      <TagInput
        savedTagList={savedTagList}
        handleShowSavedTagList={handleShowSavedTagList}
        tagInputValue={tagInputValue}
        setTagInputValue={setTagInputValue}
        setIsCreateTagBtnShown={setIsCreateTagBtnShown}
        setTagsFilteredList={setTagsFilteredList}
      />

      <div
        style={{ display: isSavedTagListShown ? "block" : "none" }}
        className="saved-tags-list"
      >
        <p>
          태그를 선택하거나 생성해주세요.{" "}
          <button onClick={handleSavedTagListShown}>X</button>
        </p>
        <ul>{tagInputValue ? paintRelatedSavedTags() : paintSavedTags()}</ul>
        <CreateTagPanel
          isCreateTagBtnShown={isCreateTagBtnShown}
          tagInputValue={tagInputValue}
        />
      </div>
    </form>
  );
}

export default RenderSelectTagsPanel;
