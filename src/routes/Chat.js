import { useEffect, useState } from "react";
import { dbService } from "fbase";
import Message from "components/Message";
import MessageFactory from "components/MessageFactory";

let isScrollBottom = true;

const Chat = ({ userObj }) => {
  const chattingBox = document.querySelector(".chattingBox");
  const [messages, setMessages] = useState([]);
  const resizeObserver = new ResizeObserver((event) => {
    if (isScrollBottom) {
      const {
        target: { scrollHeight, clientHeight },
      } = event[0];
      event[0].target.scrollTop = scrollHeight - clientHeight;
    }
  });
  if (chattingBox) {
    resizeObserver.observe(chattingBox);
  }
  useEffect(() => {
    dbService.collection("messages").onSnapshot((snapshot) => {
      const messageArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      messageArray.sort((a, b) => (a.createdAt > b.createdAt && 1) || -1);
      setMessages(messageArray);
    });
  }, []);
  const onScroll = (event) => {
    const {
      target: { scrollTop, scrollHeight, clientHeight },
    } = event;
    if (scrollTop === scrollHeight - clientHeight) {
      isScrollBottom = true;
    } else {
      isScrollBottom = false;
    }
    console.log(isScrollBottom);
  };

  
  return (
    <div className="container">
      <div className="chattingBox" onScroll={onScroll}>
        {messages.map((message) => (
          <Message
            key={message.id}
            messageObj={message}
            isOwner={message.creatorId === userObj.uid}
          />
        ))}
      </div>
      <MessageFactory userObj={userObj} />
    </div>
  );
};
export default Chat;
