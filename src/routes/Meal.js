import axios from "axios";
import { useEffect, useState } from "react";

const Meal = () => {
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [breakfast, setBreakfast] = useState([]);
  const getMeal = (val) => {
    val = val.replaceAll(/[0-9]./g, "");
    val = val.replaceAll(".", "");
    val = val.split("<br/>");
    return val;
  };
  useEffect(() => {
    let today = new Date().toISOString().substring(0, 10).replace(/-/g, "");
    let hours = new Date().getHours();
    if (hours < 8) today = today - 1;
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=G10&SD_SCHUL_CODE=7430032&Type=json`;
    const lurl = `${url}&MLSV_YMD=${today.toString()}&MMEAL_SC_CODE=2`;
    const durl = `${url}&MLSV_YMD=${today.toString()}&MMEAL_SC_CODE=3`;
    const burl = `${url}&MLSV_YMD=${(today + 1).toString()}&MMEAL_SC_CODE=1`;
    axios({
      method: "get",
      url: lurl,
      responseType: "json",
    }).then(function async(event) {
      const val = event.data.mealServiceDietInfo[1].row[0].DDISH_NM;
      setLunch(getMeal(val));
    });
    axios({
      method: "get",
      url: durl,
      responseType: "json",
    }).then(function async(event) {
      const val = event.data.mealServiceDietInfo[1].row[0].DDISH_NM;
      setDinner(getMeal(val));
    });
    axios({
      method: "get",
      url: burl,
      responseType: "json",
    }).then(function async(event) {
      const val = event.data.mealServiceDietInfo[1].row[0].DDISH_NM;
      setBreakfast(getMeal(val));
    });
  }, []);
  return (
    <>
      <div className="meal">
        <h3 className="title">점심</h3>
        <hr></hr>
        {lunch.map((food) => (
          <h4 className="food">{food}</h4>
        ))}
        {lunch.length === 0 && <h4 className="none">급식이 읎다</h4>}
      </div>
      <div className="meal">
        <h3 className="title">저녁</h3>
        <hr></hr>
        {dinner.map((food) => (
          <h4 className="food">{food}</h4>
        ))}
        {dinner.length === 0 && <h4 className="none">급식이 읎다</h4>}
      </div>
      <div className="meal">
        <h3 className="title">내일 아침</h3>
        <hr></hr>
        {breakfast.map((food) => (
          <h4 className="food">{food}</h4>
        ))}
        {breakfast.length === 0 && <h4 className="none">급식이 읎다</h4>}
      </div>
    </>
  );
};

export default Meal;
