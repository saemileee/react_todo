import TextInput from "./TextInput.js";

function TodoInput({
  showMoreCreateOptions,
  addNewTodoHandler,
  inputValue,
  setInputValue,
}) {
  const preventRunning = (e) => {
    e.preventDefault();
  };

  const updateInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form
      className="todo-form"
      onSubmit={showMoreCreateOptions ? preventRunning : addNewTodoHandler}
    >
      <h3>Task</h3>
      <TextInput
        onInput={updateInputValue}
        onFocus={null}
        value={inputValue}
        placeholder="할 일을 입력해 주세요."
      />
    </form>
  );
}

export default TodoInput;
