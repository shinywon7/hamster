import { useState } from "react";
import Chat from "routes/Chat";
import Classroom from "routes/ClassRoom";
import Todo from "routes/Todo";

const Slidebar = ({ index, userObj }) => {
  const [barHeight, setBarHeight] = useState("0px");
  const open = () => {
    setBarHeight((prev) => {
      return (prev === "0px" && "600px") || "0px";
    });
  };
  const title = ["할 일", "클래스룸", "채팅창"];
  return (
    <div className="slideContainer">
      <div className="slidebar" style={{ height: barHeight }}>
        <h2 onClick={open} className="openbtn">
          {title[index]}
        </h2>
        {index === 0 ? <>{<Todo userObj={userObj} />}</> : <></>}
        {index === 1 ? <>{<Classroom userObj={userObj} />}</> : <></>}
        {index === 2 ? <>{<Chat userObj={userObj} />}</> : <></>}
      </div>
    </div>
  );
};

export default Slidebar;
