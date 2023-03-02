function renderSelectedTagsList({ selectedTags, delSelectedTag }) {
  return (
    <ul className="selected-tags-container">
      {selectedTags.map((tag) => (
        <button className="tag" id={tag.id}>
          {tag.value}
          <button onClick={delSelectedTag}>X</button>
        </button>
      ))}
    </ul>
  );
}

export default renderSelectedTagsList;
