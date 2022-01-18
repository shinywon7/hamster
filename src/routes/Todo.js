import Task from "components/Task";
import TodoFactory from "components/TodoFactory";
import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Todo = ({ userObj }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    dbService.collection(`${userObj.uid}task`).onSnapshot((snapshot) => {
      const taskArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      taskArray.sort((a, b) => (a.date > b.date && 1) || -1);
      setTasks(taskArray);
    });
  }, []);
  let date = "";
  return (
    <div className="container">
      <div className="todoBox">
        {tasks.map((task) => {
          const sameDay = date === task.date ? true : false;
          date = task.date;
          console.log(date);
          return (
            <>
              {!sameDay && (
                <>
                  <h1 className="date">
                    {date.slice(0, 4) +
                      "-" +
                      date.slice(4, 6) +
                      "-" +
                      date.slice(6, 8)}
                  </h1>
                  <hr className="line"></hr>
                </>
              )}
              <Task key={task.id} taskObj={task} userObj={userObj} />
            </>
          );
        })}
      </div>
      <TodoFactory userObj={userObj} />
    </div>
  );
};

export default Todo;
