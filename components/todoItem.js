import { useState, useEffect } from "react";
const TodoItem = ({ item }) => {
  const [checked, setChecked] = useState(item.done);

  useEffect(() => {
    if (localStorage.getItem(item.id) !== null)
      setChecked(JSON.parse(localStorage.getItem(item.id)));
  }, []);

  useEffect(() => {
    localStorage.setItem(item.id, JSON.stringify(checked));
  }, [checked]);

  return (
    <>
      <div className="todo-item">
        <div className="todo-item-title">{item.title}</div>
        <div className="todo-item-done">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setChecked(!checked);
            }}
          />
        </div>
      </div>
    </>
  );
};
export default TodoItem;
