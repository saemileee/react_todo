function ViewMore({ handleComponentToggle, isOpen }) {
  return (
    <button className="view-more-btn" onClick={handleComponentToggle}>
      {!isOpen ? "▼" : "▲"}
    </button>
  );
}

export default ViewMore;
