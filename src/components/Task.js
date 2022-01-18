import { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencilAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const Task = ({ taskObj, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newTask, setNewTask] = useState(taskObj.text);
  const [check, setCheck] = useState(taskObj.check ? "green" : "red");
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로?");
    if (ok) {
      await dbService.doc(`${userObj.uid}task/${taskObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`${userObj.uid}task/${taskObj.id}`).update({
      text: newTask,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTask(value);
  };
  const toggleChecking = async () => {
    await dbService.doc(`${userObj.uid}task/${taskObj.id}`).update({
      check: check === "red" ? true : false,
    });
    setCheck((prev) => (prev === "red" ? "green" : "red"));
  };
  return (
    <div className="message">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container messageEdit">
            <input
              type="text"
              value={newTask}
              placeholder="What is"
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="수정" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            취소
          </span>
        </>
      ) : (
        <>
          <h4>{taskObj.text}</h4>
          <div className="message__actions">
            <span onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <span onClick={toggleEditing}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </span>
            <span onClick={toggleChecking} style={{ color: check }}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
