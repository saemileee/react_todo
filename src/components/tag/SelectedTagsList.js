function SelectedTagsList({ selectedTags, setSelectedTags }) {
  const delSelectedTag = (e) => {
    setSelectedTags(
      selectedTags.filter((tag) => e.target.parentElement.id != tag.id)
    );
  };

  return (
    <ul className="selected-tags-container">
      {selectedTags.map((tag) => (
        <button key={tag.id} className="tag" id={tag.id}>
          {tag.value}
          <span onClick={delSelectedTag}>X</span>
        </button>
      ))}
    </ul>
  );
}

export default SelectedTagsList;
