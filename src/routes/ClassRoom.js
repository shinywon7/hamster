import { useEffect, useState } from "react";
import { dbService } from "fbase";
import { gapi } from "gapi-script";
import Work from "components/Work";
import ClassroomLogo from "static/ClassroomLogo";

let workArray = [];
let tried = false;
const Classroom = ({ userObj }) => {
  const [works, setWorks] = useState([]);
  const [searching, setSearching] = useState(true);
  const [assign, setAssign] = useState(false);
  gapi.load("client:auth2", async function () {
    await gapi.auth2.init({
      client_id:
        "749452123667-6got7hn22erf9u7tuv6iv0nldisrbbkr.apps.googleusercontent.com",
    });
  });
  function authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope: "https://www.googleapis.com/auth/classroom.coursework.me",
      })
      .then(
        function () {
          console.log("Sign-in successful");
        },
        function (err) {
          console.error("Error signing in", err);
        }
      );
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyAy-k2-3XJN8JSecn2qvlew3-Mbxwpk-iA");
    return gapi.client
      .load("https://classroom.googleapis.com/$discovery/rest?version=v1")
      .then(
        function () {
          console.log("GAPI client loaded for API");
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
          setSearching(false);
        }
      );
  }
  const getWork = async (course, work) => {
    return await gapi.client.classroom.courses.courseWork.studentSubmissions
      .list({
        courseId: course.id,
        courseWorkId: work.id,
      })
      .then(
        async function (submit) {
          // Handle the results here (response.result has the parsed body).
          const {
            result: { studentSubmissions },
          } = submit;
          const { late, state } = studentSubmissions[0];
          const { title, alternateLink, dueDate, dueTime } = work;
          const { name, color, id, view } = course;

          let year = dueDate?.year === undefined ? "" : dueDate.year.toString();
          let month =
            dueDate?.month === undefined ? "" : dueDate.month.toString();
          let day = dueDate?.day === undefined ? 0 : dueDate.day;
          let hours = dueTime?.hours === undefined ? 0 : dueTime.hours + 9;
          if (hours > 23) {
            hours = hours - 12;
            day++;
          }
          day = day.toString();
          hours = hours.toString();
          let minutes =
            dueTime?.minutes === undefined ? "" : dueTime.minutes.toString();
          if (year !== "" && hours === "0") hours = "9";
          if (year !== "" && minutes === "") minutes = "00";
          const workObj = {
            id,
            view,
            name,
            color,
            title,
            link: alternateLink,
            year,
            month,
            day,
            hours,
            minutes,
            due: Number(
              year.padStart(4, "0") +
                month.padStart(2, "0") +
                day.padStart(2, "0") +
                hours.padStart(2, "0") +
                minutes.padStart(2, "0")
            ),
            state,
            late,
          };
          workArray.push(workObj);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  };
  const getCourseWork = async (course) => {
    return await gapi.client.classroom.courses.courseWork
      .list({
        courseId: course.id,
      })
      .then(
        async (response) => {
          response.result.courseWork.map(async (work) => {
            getWork(course, work);
          });
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  };
  async function getCourseList() {
    return await gapi.client.classroom.courses.list({}).then(
      async function (response) {
        response.result.courses.map(async (course) => {
          const { id, name } = course;
          const courses = await dbService
            .collection(`${userObj.uid}CoursesInfo`)
            .doc(id)
            .get();
          let courseInfo;
          console.log(courses.data());
          if (courses.data() === undefined) {
            const courseObj = {
              view: true,
              name,
              id,
              color: "#" + Math.round(Math.random() * 0xffffff).toString(16),
            };
            await dbService
              .collection(`${userObj.uid}CoursesInfo`)
              .doc(id)
              .set(courseObj);
            courseInfo = courseObj;
          } else {
            courseInfo = courses.data();
          }
          getCourseWork(courseInfo);
        });
      },
      function (err) {
        console.error("Execute error", err);
        setSearching(false);
      }
    );
  }

  const update = (times) => {
    const bef = workArray.length;
    setTimeout(() => {
      if (bef === workArray.length && workArray.length !== 0) {
        workArray = workArray.sort((a, b) => {
          if (a.due > b.due) return -1;
          return 1;
        });
        setWorks(workArray);
        setSearching(false);
        setAssign(true);
      } else {
        if (times < 100) {
          update(times++);
        }
      }
    }, 1000);
  };
  const load = async () => {
    setSearching(true);
    workArray = [];
    await loadClient();
    await getCourseList();
    update(0);
  };
  const onClick = async () => {
    //await authenticate();
    //load();
  };
  useEffect(() => {
    setTimeout(() => {
      if (tried === false) {
        tried = true;
        load();
      }
    }, 2000);
  });
  return (
    <div className="container">
      <div className="classroomBox">
        {assign ? (
          <>
            {works.map((work) => (
              <Work key={work.id} work={work} userObj={userObj} />
            ))}
          </>
        ) : (
          <>
            {searching ? (
              <>
                <div
                  className="connect"
                  style={{ fontSize: "150px", color: "f000000" }}
                >
                  기다리셈
                </div>
              </>
            ) : (
              <>
                <svg
                  height="300"
                  width="300"
                  viewBox="0 36 528 456"
                  className="logo"
                  onClick={onClick}
                >
                  <ClassroomLogo />
                </svg>
                <h1 className="connect">클래스룸 연결</h1>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Classroom;
