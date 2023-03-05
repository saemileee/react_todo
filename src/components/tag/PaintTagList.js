function PaintTagList({ tagList, selectedTags, setSelectedTags }) {
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
        ...tagList.filter((tag) => tag.id == selectedTagId),
      ]);
    }
  };

  return (
    <ul>
      {tagList.map((tag) => (
        <li key={tag.id} id={tag.id} onClick={selectTagOnList}>
          <span onClick={selectTagOnList} className="tag">
            {tag.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default PaintTagList;
