import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import Slidebar from "components/Slidebar";
import SelfStudy from "components/SelfStudy";
import Meal from "routes/Meal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const onClick = () => {
    setProfileOpen((prev) => !prev);
  };
  return (
    <Router>
      {isLoggedIn && (
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 50,
            marginLeft: 10,
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              marginLeft: 10,
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
              cursor: "pointer",
            }}
            onClick={onClick}
          >
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName}의 프로필`
                : "프로필"}
            </span>
          </div>
          {profileOpen && (
            <Profile refreshUser={refreshUser} userObj={userObj}></Profile>
          )}
        </ul>
      )}
      <Routes>
        {isLoggedIn ? (
          <>
            {/* <Route exact path="/" element={<Home userObj={userObj} />} /> */}
            <Route
              exact
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />} />
          </>
        )}
      </Routes>
      {isLoggedIn && (
        <>
          <div className="topMenu">
            <SelfStudy userObj={userObj}></SelfStudy>
          </div>
          <div className="meals">
            <Meal />
          </div>
          <div className="bottomMenu">
            <Slidebar index={0} userObj={userObj}></Slidebar>
            <Slidebar index={1} userObj={userObj}></Slidebar>
            <Slidebar index={2} userObj={userObj}></Slidebar>
          </div>
        </>
      )}
    </Router>
  );
};

export default AppRouter;
