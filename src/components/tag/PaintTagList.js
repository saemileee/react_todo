function PaintTagList({ tagList, selectTagOnList }) {
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
