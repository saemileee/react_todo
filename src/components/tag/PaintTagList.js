import { useState } from "react";
function PaintTagList({
  tagList,
  selectedTags,
  savedTagList,
  setSavedTagList,
  setSelectedTags,
  allTodos,
  setAllTodos,
  todosForRender,
  setTodosForRender,
}) {
  const [_todosForRender, _setTodosForRender] = useState([...todosForRender]);
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

  const onClickDelBtn = (e) => {
    e.stopPropagation();
    let selectedTagId = e.target.parentElement.id;
    setSavedTagList([...savedTagList.filter((tag) => tag.id != selectedTagId)]);
    setSelectedTags([...selectedTags.filter((tag) => tag.id != selectedTagId)]);
    // _setTodosForRender(
    //   [..._todosForRender].forEach(
    //     (todo) =>
    //       (todo.tags = todo.tags.filter((tag) => tag.id != selectedTagId))
    //   )
    // );
    // console.log(todosForRender);
    // setTodosForRender([
    //   ...todosForRender.map((todo) =>
    //     todo.tags.filter((tag) => tag.id != selectedTagId)
    //   ),
    // ]);
    // setAllTodos([
    //   ...allTodos.map((todo) =>
    //     todo.tags.filter((tag) => tag.id != selectedTagId)
    //   ),
    // ]);
  };

  return (
    <ul>
      {tagList.map((tag) => (
        <li key={`tag${tag.id}`} id={tag.id} onClick={selectTagOnList}>
          <span onClick={selectTagOnList} className="tag">
            {tag.value}
          </span>

          <span onClick={onClickDelBtn}>del</span>
        </li>
      ))}
    </ul>
  );
}

export default PaintTagList;
