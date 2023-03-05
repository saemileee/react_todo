function Filter({ allList, selectedTagForSearch }) {
  return (
    <div
      className="tag-search-result"
      style={{ display: selectedTagForSearch == null ? "none" : "block" }}
    >
      <span>필터: </span>
      <button className="tag">
        {selectedTagForSearch}
        <span onClick={allList}>X</span>
      </button>
    </div>
  );
}

export default Filter;
