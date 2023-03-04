function CloseBtn({ handleComponentClose }) {
  return (
    <button onClick={handleComponentClose} className="create-todo-close-btn">
      X
    </button>
  );
}

export default CloseBtn;
