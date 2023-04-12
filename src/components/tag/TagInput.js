import React from "react";
import TextInput from "../TextInput.js";

const CreateOrSelectTag = ({
  e,
  tagInputValue,
  selectedTags,
  savedTagList,
  setSelectedTags,
  setSavedTagList,
  setTagInputValue,
  setIsCreateTagBtnShown,
}) => {
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

  // 저장된 value 값이 이미 저장된 taglist의 value 값하고 같은 경우 찾았따!
  //1. 작성한 태그가 selectedTag, savedTagList에 없는 경우 << 새롭게 태그를 생성하고 selectedTag 리스트에 추가함

  //2. 작성한 태그가 selectedTag에는 없고 savedTagList에 있는 경우 << 태그는 생성하지말고 selectedTag리스트에만 추가함
};

function RenderTagInput({
  handleSavedTagListShown,
  tagInputValue,
  setTagInputValue,
  setIsCreateTagBtnShown,
  setTagsFilteredList,
  savedTagList,
  selectedTags,
  setSelectedTags,
  setSavedTagList,
}) {
  const updateTagInputValue = (e) => {
    setTagInputValue(e.target.value);
    const text = e.target.value.replaceAll(" ", "");
    if (
      text !== "" &&
      savedTagList.filter((tag) => tag.value == e.target.value).length == 0
    ) {
      setIsCreateTagBtnShown(true);
    } else {
      setIsCreateTagBtnShown(false);
    }
    //input에 공백일 시 create 버튼 안뜨게하기

    setTagsFilteredList(
      [...savedTagList].filter((tag) => tag.value.includes(e.target.value))
    );
    //타이핑하고 있는 태그와 일치하는 태그 리스트 세팅
  };

  return (
    <form className="tag-input-form" onSubmit={CreateOrSelectTag}>
      <TextInput
        onInput={updateTagInputValue}
        onFocus={handleSavedTagListShown}
        // onBlur={showTagList}
        value={tagInputValue}
        type="text"
        placeholder="태그를 추가해주세요."
      />
    </form>
  );
}

export { RenderTagInput, CreateOrSelectTag };
