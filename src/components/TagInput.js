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
    setTagsFilteredList(
      [...savedTagList].filter((tag) => tag.value.includes(e.target.value))
    );
    // console.log(e.target.value);
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
