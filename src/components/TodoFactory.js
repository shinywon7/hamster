import { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TodoFactory = ({ userObj }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTask(value);
  };
  const dateChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log("a");
    setDate(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const taskObj = {
      text: task,
      date: date.replace(/-/g, ""),
      check: false,
    };
    await dbService.collection(`${userObj.uid}task`).add(taskObj);
    setTask("");
  };
  return (
    <form onSubmit={onSubmit} className="factoryForm todo">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={task}
          onChange={onChange}
          type="text"
          placeholder="This is hal geot deul "
          maxLength={120}
          required
        />
        <input type="submit" value="+" className="factoryInput__arrow" />
      </div>
      <label className="factoryDate">
        <input onChange={dateChange} type="date" value={date} required />
      </label>
    </form>
  );
};
export default TodoFactory;
