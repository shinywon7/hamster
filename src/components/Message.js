import { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Message = ({ messageObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(messageObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로?");
    if (ok) {
      await dbService.doc(`messages/${messageObj.id}`).delete();
      if (messageObj.attachmentUrl !== "")
        await storageService.refFromURL(messageObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`messages/${messageObj.id}`).update({
      text: newMessage,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewMessage(value);
  };
  return (
    <div className="message">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container messageEdit">
            <input
              type="text"
              value={newMessage}
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
          <h4>{messageObj.text}</h4>
          {messageObj.attachmentUrl && (
            <img src={messageObj.attachmentUrl} alt="그림" />
          )}
          {isOwner && (
            <div className="message__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Message;
