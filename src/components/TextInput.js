function TextInput({ onFocus, onInput, value, placeholder }) {
  return (
    <input
      onInput={onInput}
      value={value}
      onFocus={onFocus}
      required
      type="text"
      placeholder={placeholder}
    />
  );
}

export default TextInput;
