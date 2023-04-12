import { CreateOrSelectTag } from "./TagInput.js";

function renderCreateTagPanel({ isCreateTagBtnShown, tagInputValue }) {
  return (
    <div
      className="create-new-tag"
      style={{ display: isCreateTagBtnShown ? "block" : "none" }}
    >
      <button onClick={CreateOrSelectTag}>create</button>
      <span className="tag">{tagInputValue}</span>
    </div>
  );
}

export default renderCreateTagPanel;
