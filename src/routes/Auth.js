import { authService, firebaseInstance } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import AuthForm from "components/AuthForm";

const Auth = () => {
  console.log("a");
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div className="authContainer">
      <p class="test">
        <span className="authTitle">인형원의 햄스터봇</span>
      </p>
      <AuthForm />
      <button onClick={onSocialClick} name="google" className="authBtn">
        구글로 로그인 <FontAwesomeIcon icon={faGoogle} />
      </button>
    </div>
  );
};
export default Auth;
