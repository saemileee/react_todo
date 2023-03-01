function renderTagInput({
  handleShowSavedTagList,
  tagInputValue,
  setTagInputValue,
  setIsCreateTagBtnShown,
  setTagsFilteredList,
  savedTagList,
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
    <input
      onInput={updateTagInputValue}
      onFocus={handleShowSavedTagList}
      // onBlur={showTagList}
      value={tagInputValue}
      type="text"
      placeholder="태그를 추가해주세요."
    />
  );
}

export default renderTagInput;
