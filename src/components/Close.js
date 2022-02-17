import { useEffect, useState } from "react";

const Close = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    console.log("asd");
    // window.close();
  });
  const onChange = (event) => {
    console.log(event);
  };
  return (
    <>
      <iframe
        onChange={onChange}
        src={url}
        style={{ width: "1500px", height: "1000px" }}
      ></iframe>
    </>
  );
};
export default Close;
