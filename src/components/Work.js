import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/free-brands-svg-icons";
import "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { dbService } from "fbase";
const Work = ({ work, userObj }) => {
  const [color, setColor] = useState(work.color);
  const [name, setName] = useState(work.name);
  const colorChange = (event) => {
    const {
      target: { value },
    } = event;
    setColor(value);
    const works = document.querySelectorAll(".wrokTitle");
    works.forEach((unit) => {
      if (unit.id === work.id) unit.style.backgroundColor = value;
    });
    dbService
      .collection(`${userObj.uid}CoursesInfo`)
      .doc(work.id)
      .update({ color: value });
  };
  const nameChange = (event) => {
    const {
      target: { value },
    } = event;
    setName(value);
    const works = document.querySelectorAll(".workName");
    works.forEach((unit) => {
      console.log(unit);
      if (unit.id === work.id) unit.value = value;
    });
    dbService
      .collection(`${userObj.uid}CoursesInfo`)
      .doc(work.id)
      .update({ name: value });
  };
  let { year, month, day, hours, minutes, state, late } = work;
  if (state === "TURNED_IN") state = "제출함";
  if (state === "CREATED") state = "할당됨";
  if (state === "RETURNED") state = "채점 완료";
  if (late === true) late = "늦음ㅋ";
  hours = Number(hours);
  if (hours > 12 || (hours === 12 && minutes !== "00"))
    hours = " 오후 " + String(hours - 12);
  else hours = " 오전 " + String(hours);
  return (
    <div className="work">
      <div
        id={work.id}
        className="wrokTitle title"
        style={{ backgroundColor: work.color }}
      >
        <input
          id={work.id}
          className="workName"
          onChange={nameChange}
          value={name}
        ></input>
        <div className="iconBox">
          <input
            id={work.id}
            className="colorSelect"
            type="color"
            value={color}
            onChange={colorChange}
          />
          <a className="icon" href={work.link} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </div>
      <div className="info">
        <h4 className="summary">{work.title}</h4>
        {year !== "" && (
          <h4 className="due">{`기한: ${year}.${month}.${day}${hours}:${minutes}`}</h4>
        )}
        <h4 className="state">{state}</h4>
        <h4 className="late">{late}</h4>
      </div>
    </div>
  );
};

export default Work;
