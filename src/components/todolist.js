import App from "../App";

function todolist({ id, isCompleted, content, todoDB }) {
  const completeCheck = (e) => {
    todoDB.filter((data) =>
      data.id == e.target.parentElement.id
        ? data.isCompleted
          ? (data.isCompleted = false)
          : (data.isCompleted = true)
        : null
    );
    console.log(todoDB);
  };
  return (
    <li id={id} data-iscompleted={isCompleted}>
      <button onClick={completeCheck}>{!isCompleted ? `🤔` : `😍`}</button>
      {content}
      <button>X</button>
    </li>
  );
}

export default todolist;
